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
import AnimatedContainer from '@/src/components/shared/ui/AnimatedContainer';
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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-slate-300 rounded opacity-50"></div>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            No data to display
          </h3>
          <p className="text-slate-500">
            There are no items to show at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatedContainer delay={100}>
        <TableFilters
          configs={filterConfigs}
          values={filters}
          onChange={handleFiltersChange}
        />
      </AnimatedContainer>

      <AnimatedContainer delay={200}>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transform hover:shadow-md transition-shadow duration-300">
          <TableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <TableBody items={processedItems} columns={columns} />
        </div>
      </AnimatedContainer>

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
