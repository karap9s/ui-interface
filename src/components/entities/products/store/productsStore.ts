import { mockProductData } from '@/src/components/entities/products/api/mockData';
import { ProductsState } from '@/src/components/entities/products/types/types';
import { create } from 'zustand';

export const useProductsStore = create<ProductsState>((set) => ({
  items: mockProductData,
}));
