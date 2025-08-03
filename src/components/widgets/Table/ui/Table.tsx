import { FC, JSX, useState, useMemo, useCallback } from "react";
import { TableProps } from "../model/types";
import { TableHeader, TableBody, TableFilters } from "@/src/components/features/table";
import { extractColumnsFromData, sortData, SortConfig } from "@/src/components/features/table/lib/tableHelpers";
import { extractFilterConfigs, applyFilters, FilterValue } from "@/src/components/features/table/lib/filterHelpers";
import { useModalStore } from "@/src/components/entities/modal/store/modalStore";
import EditRowDialog from "@/src/components/features/table/ui/EditRowDialog";

const Table: FC<TableProps> = ({ items }): JSX.Element => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [tableData, setTableData] = useState(items);
  
  const { isEditRowOpen, editRowData, setEditRowOpen } = useModalStore();

  // Extract columns and filter configs
  const columns = useMemo(() => extractColumnsFromData(tableData), [tableData]);
  const filterConfigs = useMemo(() => extractFilterConfigs(tableData), [tableData]);

  // Apply filters and sorting
  const processedItems = useMemo(() => {
    if (!tableData.length) return [];
    
    let result = applyFilters(tableData, filters);
    result = sortData(result, sortConfig);
    return result;
  }, [tableData, filters, sortConfig]);

  // Handle row update
  const handleRowUpdate = useCallback((updatedRow: Record<string, unknown>) => {
    setTableData(prevData => 
      prevData.map(row => 
        row.id === updatedRow.id ? updatedRow : row
      )
    );
  }, []);

  // Handle sorting
  const handleSort = useCallback((key: string) => {
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
  }, []);

  const handleFiltersChange = useCallback((newFilters: FilterValue[]) => {
    setFilters(newFilters);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditRowOpen(false);
  }, [setEditRowOpen]);

  const handleSaveRow = useCallback((updatedRow: Record<string, unknown>) => {
    handleRowUpdate(updatedRow);
    setEditRowOpen(false);
  }, [handleRowUpdate, setEditRowOpen]);

  if (!tableData.length) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="p-8 text-center text-gray-500">
          No data to display
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      <TableFilters
        configs={filterConfigs}
        values={filters}
        onChange={handleFiltersChange}
      />
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <TableHeader 
          columns={columns} 
          sortConfig={sortConfig}
          onSort={handleSort}
        />
        <TableBody 
          items={processedItems} 
          columns={columns}
        />
      </div>

      {editRowData && (
        <EditRowDialog
          isOpen={isEditRowOpen}
          onClose={handleCloseModal}
          row={editRowData}
          onSave={handleSaveRow}
        />
      )}
    </div>
  );
};

export default Table;