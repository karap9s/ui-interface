import { create } from 'zustand';
import { ModalState } from '../types/types';

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
