import React, { FC, JSX } from 'react';
import { getNestedValue } from '@/src/components/shared/lib/tableHelpers';
import Badge from '@/src/components/shared/ui/Badge';
import { formatDate, isValidDateString } from '@/src/components/shared/lib/dateUtils';

interface TableCellProps {
  row: Record<string, unknown>;
  columnKey: string;
  className?: string;
}

const TableCell: FC<TableCellProps> = ({ row, columnKey, className = "px-4 py-3 text-gray-900" }): JSX.Element => {
  const value = getNestedValue(row, columnKey);

  const renderValue = (): JSX.Element | string => {
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
  };

  return (
    <div className={className}>
      {renderValue()}
    </div>
  );
};

export default TableCell; 