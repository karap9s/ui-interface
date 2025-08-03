import { FC, JSX, useState, useMemo } from "react";
import { TableProps } from "../model/types";
import { TableHeader, TableBody, TableFilters } from "@/src/components/features/table";
import { extractColumnsFromData, sortData, SortConfig } from "@/src/components/shared/lib/tableHelpers";
import { extractFilterConfigs, applyFilters, FilterValue } from "@/src/components/shared/lib/filterHelpers";

const Table: FC<TableProps> = ({ items }): JSX.Element => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<FilterValue[]>([]);

  // Extract columns and filter configs
  const columns = useMemo(() => extractColumnsFromData(items), [items]);
  const filterConfigs = useMemo(() => extractFilterConfigs(items), [items]);

  // Apply filters and sorting
  const processedItems = useMemo(() => {
    if (!items.length) return [];
    
    let result = applyFilters(items, filters);
    result = sortData(result, sortConfig);
    return result;
  }, [items, filters, sortConfig]);

  if (!items.length) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="p-8 text-center text-gray-500">
          Нет данных для отображения
        </div>
      </div>
    );
  }

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

  return (
    <div className="space-y-4">
      {/* Filters */}
      <TableFilters 
        configs={filterConfigs}
        values={filters}
        onChange={setFilters}
      />

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <TableHeader 
          columns={columns} 
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        <TableBody items={processedItems} columns={columns} />
      </div>
    </div>
  );
};
 
export default Table;