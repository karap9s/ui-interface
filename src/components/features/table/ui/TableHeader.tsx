import { SortConfig } from '../lib/tableHelpers';
import { parseTableHeader } from '@/src/components/shared/lib/utils';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import React, { FC, JSX, useCallback, memo } from 'react';

interface TableHeaderProps {
  columns: string[];
  sortConfig: SortConfig | null;
  onSort: (key: string) => void;
}

const TableHeader: FC<TableHeaderProps> = memo(
  ({ columns, sortConfig, onSort }): JSX.Element => {
    const getSortIcon = useCallback(
      (columnKey: string): React.ReactNode => {
        if (sortConfig?.key !== columnKey) return '';

        return sortConfig.direction === 'asc' ? (
          <ArrowUpIcon size={16} />
        ) : (
          <ArrowDownIcon size={16} />
        );
      },
      [sortConfig]
    );

    const handleSort = useCallback(
      (key: string) => {
        onSort(key);
      },
      [onSort]
    );

    return (
      <div
        className="grid bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200"
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {columns.map((key) => (
          <button
            key={key}
            className="px-6 py-4 font-semibold text-slate-700 text-left hover:bg-slate-200/50 transition-all duration-200 focus:outline-none focus:bg-slate-200/50 hover:cursor-pointer group"
            onClick={() => handleSort(key)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-wide">
                {parseTableHeader(key)}
              </span>
              {getSortIcon(key) && (
                <span className="text-indigo-500 ml-2 group-hover:scale-110 transition-transform duration-200">
                  {getSortIcon(key)}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  }
);

TableHeader.displayName = 'TableHeader';

export default TableHeader;
