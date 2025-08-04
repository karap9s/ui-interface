import { mockPricePlansData } from '@/src/components/entities/price-plans/api/mockData';
import { PricePlansState } from '@/src/components/entities/price-plans/types/types';
import { create } from 'zustand';

export const usePricePlansStore = create<PricePlansState>((set) => ({
  items: mockPricePlansData,
  updateItem: (updatedItem: Record<string, unknown>) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    })),
}));
