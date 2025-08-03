export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export function extractColumnsFromData(data: Array<Record<string, unknown>>): string[] {
  if (!data.length) return [];
  
  const columns = new Set<string>();
  
  function extractKeys(obj: Record<string, unknown>, prefix = '') {
    Object.keys(obj).forEach(key => {
      if (key === 'id') return;
      
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      
      if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        // Recursively process nested objects
        extractKeys(value as Record<string, unknown>, fullKey);
      } else {
        columns.add(fullKey);
      }
    });
  }
  
  // Extract from all objects to get all possible columns
  data.forEach(item => extractKeys(item));
  
  return Array.from(columns);
}

export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    return current && typeof current === 'object' ? (current as Record<string, unknown>)[key] : undefined;
  }, obj as unknown);
}

export function sortData(
  data: Array<Record<string, unknown>>,
  sortConfig: SortConfig | null
): Array<Record<string, unknown>> {
  if (!sortConfig) return data;

  return [...data].sort((a, b) => {
    const aValue = getNestedValue(a, sortConfig.key);
    const bValue = getNestedValue(b, sortConfig.key);

    // Handle null/undefined values
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
    if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1;

    // Compare values
    let comparison = 0;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime();
    } else {
      // Fallback to string comparison
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });
} 