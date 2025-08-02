// Sorting, Filtration of the table.

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

const CLOTHING_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

function isClothingSize(value: string): boolean {
  return CLOTHING_SIZES.includes(value.toUpperCase());
}

function getClothingSizeOrder(size: string): number {
  return CLOTHING_SIZES.indexOf(size.toUpperCase());
}

export function extractColumnsFromData(data: Array<Record<string, unknown>>): string[] {
  if (!data.length) return [];

  const firstRow = data[0];
  const columns: string[] = [];

  Object.keys(firstRow).forEach(key => {
    if (key === 'id') return; // Skip id column
    
    const value = firstRow[key];
    
    // If value is an object, create separate columns for each property
    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      Object.keys(value as Record<string, unknown>).forEach(subKey => {
        columns.push(`${key}.${subKey}`);
      });
    } else {
      columns.push(key);
    }
  });

  return columns;
}

export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  if (!path.includes('.')) {
    return obj[path];
  }

  const [parentKey, childKey] = path.split('.');
  const parentValue = obj[parentKey];
  
  if (parentValue && typeof parentValue === 'object' && !Array.isArray(parentValue)) {
    return (parentValue as Record<string, unknown>)[childKey];
  }
  
  return undefined;
}

export function sortData(
  data: Array<Record<string, unknown>>, 
  sortConfig: SortConfig | null
): Array<Record<string, unknown>> {
  if (!sortConfig || !sortConfig.direction) {
    return data;
  }

  return [...data].sort((a, b) => {
    const aValue = getNestedValue(a, sortConfig.key);
    const bValue = getNestedValue(b, sortConfig.key);

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    // Handle clothing sizes
    if (typeof aValue === 'string' && typeof bValue === 'string' && 
        isClothingSize(aValue) && isClothingSize(bValue)) {
      const aOrder = getClothingSizeOrder(aValue);
      const bOrder = getClothingSizeOrder(bValue);
      return sortConfig.direction === 'asc' ? aOrder - bOrder : bOrder - aOrder;
    }

    // Handle different types
    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return sortConfig.direction === 'asc' 
        ? (aValue === bValue ? 0 : aValue ? 1 : -1)
        : (aValue === bValue ? 0 : aValue ? -1 : 1);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Handle dates
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      
      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        return sortConfig.direction === 'asc' 
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }
    }

    // Handle strings
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    return sortConfig.direction === 'asc' 
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });
}
