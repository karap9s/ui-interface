import React, { FC, useCallback, memo } from 'react';
import { getFilterValue, updateFilter, clearAllFilters, formatDisplayValue } from '../model/filterModel';
import { FilterConfig, FilterValue } from '@/src/components/shared/lib/filterHelpers';
import TextFilter from '@/src/components/shared/ui/filters/TextFilter';
import BooleanFilter from '@/src/components/shared/ui/filters/BooleanFilter';
import DateFilter from '@/src/components/shared/ui/filters/DateFilter';

interface TableFiltersProps {
  configs: FilterConfig[];
  values: FilterValue[];
  onChange: (filters: FilterValue[]) => void;
}

const TableFilters: FC<TableFiltersProps> = memo(({ configs, values, onChange }) => {
  const handleUpdateFilter = useCallback((key: string, value: unknown, type: string) => {
    const newFilters = updateFilter(values, key, value, type);
    onChange(newFilters);
  }, [values, onChange]);

  const handleClearAllFilters = useCallback(() => {
    const newFilters = clearAllFilters();
    onChange(newFilters);
  }, [onChange]);

  const handleRemoveFilter = useCallback((key: string, type: string) => {
    handleUpdateFilter(key, null, type);
  }, [handleUpdateFilter]);

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {values.length > 0 && (
          <button
            onClick={handleClearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none hover:cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {configs.map((config) => {
          const value = getFilterValue(values, config.key);
          const stringValue = (value as string) || '';
          
          switch (config.type) {
            case 'text':
              return (
                <TextFilter
                  key={`${config.key}-${stringValue}`}
                  config={config}
                  value={stringValue}
                  onChange={(newValue) => handleUpdateFilter(config.key, newValue, config.type)}
                />
              );
              
            case 'boolean':
              return (
                <BooleanFilter
                  key={config.key}
                  config={config}
                  value={value as boolean | null ?? null}
                  onChange={(newValue) => handleUpdateFilter(config.key, newValue, config.type)}
                />
              );
              
            case 'date':
              return (
                <DateFilter
                  key={`${config.key}-${stringValue}`}
                  config={config}
                  value={stringValue}
                  onChange={(newValue) => handleUpdateFilter(config.key, newValue, config.type)}
                />
              );
              
            default:
              return null;
          }
        })}
      </div>
      
      {values.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {values.map((filter) => {
              const config = configs.find(c => c.key === filter.key);
              if (!config) return null;
              
              const displayValue = formatDisplayValue(filter);
              
              return (
                <span
                  key={filter.key}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {config.label}: {displayValue}
                  <button
                    onClick={() => handleRemoveFilter(filter.key, filter.type)}
                    className="hover:text-blue-600 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

TableFilters.displayName = 'TableFilters';

export default TableFilters; 