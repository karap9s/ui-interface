import React, { FC, useCallback, memo } from 'react';
import {
  getFilterValue,
  updateFilter,
  clearAllFilters,
  formatDisplayValue,
} from '../model/filterModel';
import { FilterConfig, FilterValue } from '../lib/filterHelpers';
import TextFilter from './filters/TextFilter';
import BooleanFilter from './filters/BooleanFilter';
import DateFilter from './filters/DateFilter';
import { X } from 'lucide-react';

interface TableFiltersProps {
  configs: FilterConfig[];
  values: FilterValue[];
  onChange: (filters: FilterValue[]) => void;
}

const TableFilters: FC<TableFiltersProps> = memo(
  ({ configs, values, onChange }) => {
    const handleUpdateFilter = useCallback(
      (key: string, value: unknown, type: string) => {
        const newFilters = updateFilter(values, key, value, type);
        onChange(newFilters);
      },
      [values, onChange]
    );

    const handleClearAllFilters = useCallback(() => {
      const newFilters = clearAllFilters();
      onChange(newFilters);
    }, [onChange]);

    const handleRemoveFilter = useCallback(
      (key: string, type: string) => {
        handleUpdateFilter(key, null, type);
      },
      [handleUpdateFilter]
    );

    return (
      <div className="bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text dark:text-slate-100">
            Filters
          </h3>
          {values.length > 0 && (
            <button
              onClick={handleClearAllFilters}
              className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {configs.map((config) => {
            try {
              const value = getFilterValue(values, config.key);
              const stringValue = (value as string) || '';

              switch (config.type) {
                case 'text':
                  return (
                    <TextFilter
                      key={`${config.key}-${stringValue}`}
                      config={config}
                      value={stringValue}
                      onChange={(newValue) =>
                        handleUpdateFilter(config.key, newValue, config.type)
                      }
                    />
                  );

                case 'boolean':
                  return (
                    <BooleanFilter
                      key={config.key}
                      config={config}
                      value={(value as boolean | null) ?? null}
                      onChange={(newValue) =>
                        handleUpdateFilter(config.key, newValue, config.type)
                      }
                    />
                  );

                case 'date':
                  return (
                    <DateFilter
                      key={`${config.key}-${stringValue}`}
                      config={config}
                      value={stringValue}
                      onChange={(newValue) =>
                        handleUpdateFilter(config.key, newValue, config.type)
                      }
                    />
                  );

                default:
                  return null;
              }
            } catch (error) {
              console.error(error, { config });
              return null;
            }
          })}
        </div>

        {values.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap gap-3">
              <span className="text-sm font-medium text-slate-600 flex items-center mb-2 dark:text-slate-300">
                Active filters:
              </span>
              {values.map((filter) => {
                const config = configs.find((c) => c.key === filter.key);
                if (!config) return null;

                const displayValue = formatDisplayValue(filter);

                return (
                  <span
                    key={filter.key}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 text-sm font-medium rounded-lg border border-indigo-200 shadow-sm"
                  >
                    {config.label}:{' '}
                    <span className="font-semibold">{displayValue}</span>
                    <button
                      onClick={() =>
                        handleRemoveFilter(filter.key, filter.type)
                      }
                      className="ml-1 hover:text-indigo-600 hover:bg-indigo-200 rounded-full p-1 transition-all duration-200 focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

TableFilters.displayName = 'TableFilters';

export default TableFilters;
