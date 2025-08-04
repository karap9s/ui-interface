import { TableCell } from '@/src/components/entities/table';
import { useModalStore } from '@/src/components/entities/modal/store/modalStore';
import React, { FC, JSX, useCallback, memo } from 'react';

interface TableRowProps {
  row: Record<string, unknown>;
  columns: string[];
}

const TableRow: FC<TableRowProps> = memo(({ row, columns }): JSX.Element => {
  const { setEditRowOpen } = useModalStore();

  const handleRowClick = useCallback(() => {
    setEditRowOpen(true, row);
  }, [setEditRowOpen, row]);

  return (
    <div
      className="grid hover:bg-indigo-50/30 transition-all duration-200 hover:cursor-pointer border-b border-slate-100 last:border-b-0 group"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      onClick={handleRowClick}
    >
      {columns.map((columnKey) => {
        try {
          return <TableCell key={columnKey} row={row} columnKey={columnKey} />;
        } catch (error) {
          console.error(error, { columnKey, row });
          return null;
        }
      })}
    </div>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
