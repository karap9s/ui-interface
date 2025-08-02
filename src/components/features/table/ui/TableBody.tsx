import TableRow from '@/src/components/features/table/ui/TableRow';
import React, { FC, JSX } from 'react';

interface TableBodyProps {
  items: Array<Record<string, unknown>>;
  columns: string[];
}

const TableBody: FC<TableBodyProps> = ({ items, columns }): JSX.Element => {
  return (
    <div className="divide-y divide-gray-200 max-h-[calc(100dvh-56px)] overflow-y-auto">
      {items.map((row, index) => (
        <TableRow
          key={`${row.id}-${index}`}
          row={row}
          columns={columns}
          index={index}
        />
      ))}
    </div>
  );
};

export default TableBody; 