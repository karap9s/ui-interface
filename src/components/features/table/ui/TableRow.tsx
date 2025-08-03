import { TableCell } from '@/src/components/entities/table';
import { useModalStore } from '@/src/components/entities/modal/store/modalStore';
import React, { FC, JSX, useCallback, memo } from 'react';

interface TableRowProps {
  row: Record<string, unknown>;
  columns: string[];
  index: number;
}

const TableRow: FC<TableRowProps> = memo(({ row, columns, index }): JSX.Element => {
  const { setEditRowOpen } = useModalStore();

  const handleRowClick = useCallback(() => {
    setEditRowOpen(true, row);
  }, [setEditRowOpen, row]);

  return (
    <div
      key={`${row.id}-${index}`}
      className="grid hover:bg-gray-50 transition-colors hover:cursor-pointer"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      onClick={handleRowClick}
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
});

TableRow.displayName = 'TableRow';

export default TableRow; 