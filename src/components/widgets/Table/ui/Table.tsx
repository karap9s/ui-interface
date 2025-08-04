import { FC, JSX, useState, useMemo, useCallback } from 'react';
import { TableProps } from '../model/types';
import {
  TableHeader,
  TableBody,
  TableFilters,
  EditRowDialog,
} from '@/src/components/features/table';
import {
  extractColumnsFromData,
  sortData,
  SortConfig,
} from '@/src/components/features/table/lib/tableHelpers';
import {
  extractFilterConfigs,
  applyFilters,
  FilterValue,
} from '@/src/components/features/table/lib/filterHelpers';
import { useModalStore } from '@/src/components/entities/modal/store/modalStore';
const Table: FC<TableProps> = ({ items, updateItem }): JSX.Element => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<FilterValue[]>([]);

  const { isEditRowOpen, editRowData, setEditRowOpen } = useModalStore();

  // Extract columns and filter configs
  const columns = useMemo(() => {
    try {
      return extractColumnsFromData(items);
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [items]);

  const filterConfigs = useMemo(() => {
    try {
      return extractFilterConfigs(items);
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [items]);

  // Apply filters and sorting
  const processedItems = useMemo(() => {
    try {
      if (!items.length) return [];

      let result = applyFilters(items, filters);
      result = sortData(result, sortConfig);
      return result;
    } catch (error) {
      console.error(error);
      return items;
    }
  }, [items, filters, sortConfig]);

  // Handle row update
  const handleRowUpdate = useCallback(
    (updatedRow: Record<string, unknown>) => {
      updateItem(updatedRow);
    },
    [updateItem]
  );

  const handleSort = useCallback((key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        } else if (current.direction === 'desc') {
          return null;
        }
      }

      return { key, direction: 'asc' };
    });
  }, []);

  const handleFiltersChange = useCallback((newFilters: FilterValue[]) => {
    setFilters(newFilters);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditRowOpen(false);
  }, [setEditRowOpen]);

  const handleSaveRow = useCallback(
    (updatedRow: Record<string, unknown>) => {
      handleRowUpdate(updatedRow);
      setEditRowOpen(false);
    },
    [handleRowUpdate, setEditRowOpen]
  );

  if (!items.length) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="p-8 text-center text-gray-500">No data to display</div>
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
        <TableBody items={processedItems} columns={columns} />
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
