import { getNestedValue } from './tableHelpers';
import { isValidDateString } from './dateUtils';

export type FilterType = 'text' | 'boolean' | 'date';

export interface FilterConfig {
  key: string;
  type: FilterType;
  label: string;
}

export interface FilterValue {
  key: string;
  value: unknown;
  type: FilterType;
}

// Автоматически определяет тип фильтра по значению
export function detectFilterType(value: unknown): FilterType {
  if (typeof value === 'boolean') {
    return 'boolean';
  }
  
  if (typeof value === 'string' && isValidDateString(value)) {
    return 'date';
  }
  
  return 'text';
}

// Извлекает конфигурацию фильтров из данных
export function extractFilterConfigs(data: Array<Record<string, unknown>>): FilterConfig[] {
  if (!data.length) return [];

  const firstRow = data[0];
  const configs: FilterConfig[] = [];

  const processObject = (obj: Record<string, unknown>, prefix = '') => {
    Object.keys(obj).forEach(key => {
      if (key === 'id') return; // Skip id field

      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        // Рекурсивно обрабатываем вложенные объекты
        processObject(value as Record<string, unknown>, fullKey);
      } else {
        const type = detectFilterType(value);
        const label = fullKey.split('.').pop()!
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/_/g, ' ')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, letter => letter.toUpperCase());

        configs.push({
          key: fullKey,
          type,
          label
        });
      }
    });
  };

  processObject(firstRow);
  return configs;
}

// Применяет фильтры к данным
export function applyFilters(
  data: Array<Record<string, unknown>>,
  filters: FilterValue[]
): Array<Record<string, unknown>> {
  if (!filters.length) return data;

  return data.filter(row => {
    return filters.every(filter => {
      const value = getNestedValue(row, filter.key);
      
      switch (filter.type) {
        case 'text':
          if (!filter.value || typeof filter.value !== 'string') return true;
          const searchText = filter.value.toLowerCase();
          const fieldValue = String(value || '').toLowerCase();
          return fieldValue.includes(searchText);

        case 'boolean':
          if (filter.value === null || filter.value === undefined || filter.value === '') return true;
          return value === filter.value;

        case 'date':
          if (!filter.value) return true;
          
          // Single date filter
          if (typeof filter.value !== 'string') return true;
          const filterDate = new Date(filter.value);
          const itemDate = new Date(String(value));
          
          if (isNaN(filterDate.getTime()) || isNaN(itemDate.getTime())) return true;
          
          // Compare only date part (ignore time)
          return filterDate.toDateString() === itemDate.toDateString();

        default:
          return true;
      }
    });
  });
} 