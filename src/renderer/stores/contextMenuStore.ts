// stores/contextMenuStore.ts (새로운 파일)
import { create } from 'zustand';

interface ContextMenuState {
  clickedElementId: string | null;
  setClickedElementId: (id: string | null) => void;
}

interface TabStore {
    tabTemp: string;
    setTabTemp: (tabTemp: string) => void;
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  clickedElementId: null, // 초기 값
  setClickedElementId: (id) => set({ clickedElementId: id }),
}));

export const useTabStore = create<TabStore>((set) => ({
    tabTemp: "main",
    setTabTemp: (tabTemp) => set({ tabTemp }),
}));