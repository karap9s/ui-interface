import React, { FC, JSX, useMemo, memo } from 'react';
import Badge from '@/src/components/shared/ui/Badge';
import { formatDate, isValidDateString } from '@/src/components/shared/lib/dateUtils';
import { getNestedValue } from '@/src/components/features/table/lib/tableHelpers';

interface TableCellProps {
  row: Record<string, unknown>;
  columnKey: string;
  className?: string;
}

const TableCell: FC<TableCellProps> = memo(({ row, columnKey, className = "px-4 py-3 text-gray-900" }): JSX.Element => {
  const value = useMemo(() => getNestedValue(row, columnKey), [row, columnKey]);

  const renderedValue = useMemo((): JSX.Element | string => {
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
  }, [value]);

  return (
    <div className={className}>
      {renderedValue}
    </div>
  );
});

TableCell.displayName = 'TableCell';

export default TableCell; 