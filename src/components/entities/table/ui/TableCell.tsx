import React, { FC, JSX, useMemo, memo } from 'react';
import Badge from '@/src/components/shared/ui/Badge';
import {
  formatDate,
  isValidDateString,
} from '@/src/components/shared/lib/dateUtils';
import { getNestedValue } from '@/src/components/features/table/lib/tableHelpers';

interface TableCellProps {
  row: Record<string, unknown>;
  columnKey: string;
}

const TableCell: FC<TableCellProps> = memo(
  ({ row, columnKey }): JSX.Element => {
    const value = useMemo(() => {
      try {
        return getNestedValue(row, columnKey);
      } catch (error) {
        console.error(error, { row, columnKey });
        return null;
      }
    }, [row, columnKey]);

    const renderedValue = useMemo((): JSX.Element | string => {
      try {
        if (value === null || value === undefined) {
          return '';
        }

        if (typeof value === 'boolean') {
          return <Badge value={value} />;
        }

        if (typeof value === 'string' && isValidDateString(value)) {
          return formatDate(value);
        }

        return String(value);
      } catch (error) {
        console.error(error, {
          value,
          columnKey,
        });
        return 'Error';
      }
    }, [value, columnKey]);

    return (
      <div className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100 transition-colors duration-200 flex items-center justify-start h-[64px] sm:h-[80px] overflow-hidden">
        <div className="line-clamp-2 w-full leading-tight">
          {renderedValue}
        </div>
      </div>
    );
  }
);

TableCell.displayName = 'TableCell';

export default TableCell;
