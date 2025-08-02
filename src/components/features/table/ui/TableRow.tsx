import React, { FC, JSX } from 'react';
import { TableCell } from '../../../entities/table';

interface TableRowProps {
  row: Record<string, unknown>;
  columns: string[];
  index: number;
}

const TableRow: FC<TableRowProps> = ({ row, columns, index }): JSX.Element => {
  return (
    <div
      key={`${row.id}-${index}`}
      className="grid hover:bg-gray-50 transition-colors"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((key) => (
        <TableCell
          key={key}
          value={row[key]}
        />
      ))}
    </div>
  );
};

export default TableRow; 