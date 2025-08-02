import { SortConfig } from '@/src/components/shared/lib/tableHelpers';
import { parseTableHeader } from '@/src/components/shared/lib/utils';
import React, { FC, JSX } from 'react';

interface TableHeaderProps {
  columns: string[];
  sortConfig: SortConfig | null;
  onSort: (key: string) => void;
}

const TableHeader: FC<TableHeaderProps> = ({ columns, sortConfig, onSort }): JSX.Element => {
  const getSortIcon = (columnKey: string): string => {
    if (sortConfig?.key !== columnKey) return '';
    
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div 
      className="grid bg-gray-50 border-b border-gray-200"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((key) => (
        <button
          key={key}
          className="px-4 py-3 font-medium text-gray-700 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100 hover:cursor-pointer"
          onClick={() => onSort(key)}
        >
          <div className="flex items-center justify-between">
            <span>{parseTableHeader(key)}</span>
            {getSortIcon(key) && (
              <span className="text-gray-600 ml-1">{getSortIcon(key)}</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TableHeader; 