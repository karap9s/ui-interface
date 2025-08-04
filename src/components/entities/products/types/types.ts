export interface ProductsState {
  items: Array<Record<string, unknown>>;
  updateItem: (updatedItem: Record<string, unknown>) => void;
}
