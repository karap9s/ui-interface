import React, { FC, JSX } from 'react';
import { isValidDateString, formatDate } from '../../../shared/lib/dateUtils';
import Badge from '../../../shared/ui/Badge';

interface TableCellProps {
  value: unknown;
  className?: string;
}

const TableCell: FC<TableCellProps> = ({ value, className = "px-4 py-3 text-gray-900" }): JSX.Element => {
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