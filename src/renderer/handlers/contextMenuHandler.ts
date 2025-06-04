import { useContextMenu } from 'react-contexify';
import { createRef } from 'react';
import type { DockLayout } from 'rc-dock';
import { MENU_ID } from '../components/menus/dockContextMenu';

export const layoutRef = createRef<DockLayout>();
export const { show } = useContextMenu({ id: MENU_ID });

export const handleContextMenu = (e: React.MouseEvent) => {
  e.preventDefault();
  show({ event: e });
};
