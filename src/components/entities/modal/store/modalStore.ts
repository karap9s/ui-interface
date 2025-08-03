import { create } from 'zustand';
import { ModalState } from '../types/types';

interface EditRowModalState {
  isEditRowOpen: boolean;
  editRowData: Record<string, unknown> | undefined;
  setEditRowOpen: (isOpen: boolean, rowData?: Record<string, unknown>) => void;
}

export const useModalStore = create<ModalState & EditRowModalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  
  isEditRowOpen: false,
  editRowData: undefined,
  setEditRowOpen: (isOpen, rowData) => set({ 
    isEditRowOpen: isOpen, 
    editRowData: rowData 
  }),
}));
