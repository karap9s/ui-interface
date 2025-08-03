import { isValidDateString } from '@/src/components/shared/lib/dateUtils';

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'boolean' | 'date';
}

export interface FilterValue {
  key: string;
  value: unknown;
  type: string;
}

// Automatically determines filter type by value
export function detectFilterType(value: unknown): 'text' | 'boolean' | 'date' {
  if (typeof value === 'boolean') {
    return 'boolean';
  }
  
  if (typeof value === 'string' && isValidDateString(value)) {
    return 'date';
  }
  
  return 'text';
}

// Extracts filter configurations from data
export function extractFilterConfigs(data: Array<Record<string, unknown>>): FilterConfig[] {
  if (!data.length) return [];
  
  const configs: FilterConfig[] = [];
  
  function processObject(obj: Record<string, unknown>, prefix = '') {
    Object.keys(obj).forEach(key => {
      if (key === 'id') return; // Skip id field

      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        // Recursively process nested objects
        processObject(value as Record<string, unknown>, fullKey);
      } else {
        // Use only the last part of the key for the label
        const label = fullKey.split('.').pop()!
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/_/g, ' ')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, letter => letter.toUpperCase());

        const type = detectFilterType(value);
        
        const existing = configs.find(c => c.key === fullKey);
        if (!existing) {
          configs.push({
            key: fullKey,
            label,
            type
          });
        }
      }
    });
  }
  
  processObject(data[0]);
  return configs;
}

// Applies filters to data
export function applyFilters(data: Array<Record<string, unknown>>, filters: FilterValue[]): Array<Record<string, unknown>> {
  if (!filters.length) return data;

  return data.filter(item => {
    return filters.every(filter => {
      const value = getNestedValue(item, filter.key);
      
      if (filter.value === null || filter.value === undefined || filter.value === '') {
        return true;
      }

      switch (filter.type) {
        case 'text':
          return String(value || '').toLowerCase().includes(String(filter.value).toLowerCase());
        case 'boolean':
          return value === filter.value;
        case 'date':
          if (typeof value === 'string' && isValidDateString(value)) {
            return value.startsWith(String(filter.value));
          }
          return false;
        default:
          return true;
      }
    });
  });
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? (current as Record<string, unknown>)[key] : undefined;
  }, obj as unknown);
} 