import { FilterType, FilterValue } from "@/src/components/shared/lib/filterHelpers";

export function getFilterValue(values: FilterValue[], key: string) {
  const filter = values.find(f => f.key === key);
  return filter?.value;
}

export function updateFilter(
  values: FilterValue[], 
  key: string, 
  value: unknown, 
  type: string
): FilterValue[] {
  const newFilters = values.filter(f => f.key !== key);
  
  // Only add filter if value is not empty/null
  if (value !== null && value !== undefined && value !== '') {
    newFilters.push({
      key,
      value,
      type: type as FilterType
    });
  }
  
  return newFilters;
}

export function clearAllFilters(): FilterValue[] {
  return [];
}

export function formatDisplayValue(filter: FilterValue): string {
  return String(filter.value);
} 