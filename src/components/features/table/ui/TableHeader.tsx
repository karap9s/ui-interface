import React, { FC, JSX } from 'react';
import { parseTableHeader } from '../../../shared/lib/utils';

interface TableHeaderProps {
  columns: string[];
}

const TableHeader: FC<TableHeaderProps> = ({ columns }): JSX.Element => {
  return (
    <div 
      className="grid bg-gray-50 border-b border-gray-200"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((key) => (
        <div
          key={key}
          className="px-4 py-3 font-medium text-gray-700"
        >
          {parseTableHeader(key)}
        </div>
      ))}
    </div>
  );
};

export default TableHeader; 