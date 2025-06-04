import { Menu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

export const MENU_ID = 'dock-menu';

export const menus = [
    { id: 'tab1', label: '📂 Tab 1 열기' },
    { id: 'tab2', label: '📂 Tab 2 열기' },
    { id: 'tab3', label: '📂 Tab 3 열기' },
    { id: 'tab4', label: '📂 Tab 4 열기' },
]

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
