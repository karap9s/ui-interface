export interface TableProps {
  items: Array<Record<string, unknown>>;
  updateItem: (updatedItem: Record<string, unknown>) => void;
}
