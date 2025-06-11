import { useContextMenu } from 'react-contexify';
import { createRef } from 'react';
import type { DockLayout } from 'rc-dock';
import { MENU_ID, WIN_MENU_ID } from '../components/menus/dockContextMenu';
import { useContextMenuStore, useTabStore } from '../stores/contextMenuStore';

export const layoutRef = createRef<DockLayout>();
export const { show: show1 } = useContextMenu({ id: MENU_ID });
export const { show: show2 } = useContextMenu({ id: WIN_MENU_ID });

export const handleContextMenu = (e: React.MouseEvent) => {
  e.preventDefault();

  const setClickedElementId = useContextMenuStore.getState().setClickedElementId;
  const clickedElementId = (e.target as HTMLElement).id;
  
  const testId = useTabStore.getState().setTabTemp;
  setClickedElementId(clickedElementId);
  testId("tab1")

  show1({ event: e });
};

export const handleNewWinMenu = (e: React.MouseEvent) => {
  e.preventDefault();
  show2({ event: e });
};