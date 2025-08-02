import { FC, JSX, useState } from "react";
import { TableProps } from "../model/types";
import { TableHeader, TableBody } from "@/src/components/features/table";
import { extractColumnsFromData, sortData, SortConfig } from "@/src/components/shared/lib/tableHelpers";

const Table: FC<TableProps> = ({ items }): JSX.Element => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  if (!items.length) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="p-8 text-center text-gray-500">
          Нет данных для отображения
        </div>
      </div>
    );
  }

  // Extract columns including nested object properties
  const columns = extractColumnsFromData(items);

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        // Same column clicked - toggle between asc and desc
        return { 
          key, 
          direction: current.direction === 'asc' ? 'desc' : 'asc' 
        };
      } else {
        // Different column clicked - start with ascending
        return { key, direction: 'asc' };
      }
    });
  };

  // Sort data based on current sort config
  const sortedItems = sortData(items, sortConfig);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <TableHeader 
        columns={columns} 
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      {/* Body with scroll */}
      <TableBody items={sortedItems} columns={columns} />
    </div>
  );
};
 
export default Table;