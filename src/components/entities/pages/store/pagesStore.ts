import { mockPagesData } from '@/src/components/entities/pages/api/mockData';
import { PagesState } from '@/src/components/entities/pages/types/types';
import { create } from 'zustand';

export const usePagesStore = create<PagesState>((set) => ({
  items: mockPagesData,
}));
