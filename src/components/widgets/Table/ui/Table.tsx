import { FC, JSX } from "react";
import { TableProps } from "../model/types";
import { parseTableHeader, formatTableValue } from "../../../shared/lib/utils";

const Table: FC<TableProps> = ({ items }): JSX.Element => {
  if (!items.length) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="p-8 text-center text-gray-500">
          Нет данных для отображения
        </div>
      </div>
    );
  }

  // Get keys from the first object for headers, and exclude 'id' as utility key
  const columns = Object.keys(items[0]).filter(key => key !== 'id');

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
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

      {/* Body */}
      <div className="divide-y divide-gray-200">
        {items.map((row, index) => (
          <div
            key={`${row.id}-${index}`}
            className="grid hover:bg-gray-50 transition-colors"
            style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
          >
            {columns.map((key) => (
              <div
                key={key}
                className="px-4 py-3 text-gray-900"
              >
                {formatTableValue(row[key])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Table;