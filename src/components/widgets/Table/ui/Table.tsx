import { FC, JSX } from "react";
import { TableProps } from "../model/types";
import { TableHeader, TableRow } from "@/src/components/features/table";

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
      <TableHeader columns={columns} />

      {/* Body */}
      <div className="divide-y divide-gray-200">
        {items.map((row, index) => (
          <TableRow
            key={`${row.id}-${index}`}
            row={row}
            columns={columns}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
 
export default Table;