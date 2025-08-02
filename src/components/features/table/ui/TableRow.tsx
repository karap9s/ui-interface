import { TableCell } from '@/src/components/entities/table';
import React, { FC, JSX } from 'react';

interface TableRowProps {
  row: Record<string, unknown>;
  columns: string[];
  index: number;
}

const TableRow: FC<TableRowProps> = ({ row, columns, index }): JSX.Element => {
  return (
    <div
      key={`${row.id}-${index}`}
      className="grid hover:bg-gray-50 transition-colors hover:cursor-pointer"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((columnKey) => (
        <TableCell
          key={columnKey}
          row={row}
          columnKey={columnKey}
        />
      ))}
    </div>
  );
};

export default TableRow; 