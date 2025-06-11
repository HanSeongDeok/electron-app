import { layoutRef } from '@/renderer/handlers/contextMenuHandler';
import { useContextMenuStore, useTabStore } from '@/renderer/stores/contextMenuStore';
import { Menu, Item, Separator } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { useState } from 'react';

export const MENU_ID = 'dock-menu';
export const WIN_MENU_ID = 'win-dock-menu';

export const menus = [
    { id: 'tab1', label: '📂 Tab 1 열기' },
    { id: 'tab2', label: '📂 Tab 2 열기' },
    { id: 'tab3', label: '📂 Tab 3 열기' },
    { id: 'tab4', label: '📂 Tab 4 열기' },
]

interface DockContextMenuProps {
    onOpenTab: (id: string) => void;
    openNewWindow: (id: string) => void;
}

export const DockContextMenu = ({ onOpenTab }: { onOpenTab: (id: string) => void }) => {
    return (
        <Menu id={MENU_ID} theme="dark" className="!min-w-[180px] text-sm p-1">
            {menus.map((menu) => (
                <Item key={menu.id} onClick={() => onOpenTab(menu.id)}>
                    {menu.label}
                </Item>
            ))}
        </Menu>
    );
}

export const NewWindowMenu = ({ onOpenTab, openNewWindow }: DockContextMenuProps) => {
    return (
        <Menu id={MENU_ID} theme="dark" className="!min-w-[180px] text-sm p-1">
            {menus.map((menu) => (
                <Item key={menu.id} onClick={() => onOpenTab(menu.id)}>
                    {menu.label}
                </Item>
            ))}
            <Separator />
            <Item onClick={() => {
                console.log('탭 닫기')
                const size = layoutRef.current?.getLayout().dockbox.children.length
                if (size === 1) {
                    let temp = useContextMenuStore.getState().clickedElementId;
                    if (temp == null) {
                        temp = 'Not Yet'
                    }
                    window.close();
                }
                console.log(size)
            }}>탭 닫기</Item>
            <Item onClick={() => console.log('다시 로드')}>다시 로드</Item>
            <Separator />
            <Item onClick={() => {
                let temp = useContextMenuStore.getState().clickedElementId;
                if (temp == null) {
                    temp = 'Not Yet'
                }
                openNewWindow(temp)
            }}>🪟 새 창으로 열기</Item>
        </Menu>
    );
}