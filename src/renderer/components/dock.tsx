import { Button } from '@/components/ui/button';
import DockLayout from 'rc-dock';
import type { LayoutData, TabData } from 'rc-dock';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { handleContextMenu, layoutRef } from '@handlers/contextMenuHandler';
import { DockContextMenu, menus } from './menus/dockContextMenu';

const tab1: TabData = {
    id: 'tab1',
    title: 'tab1',
    closable: true,
    content: <div>Hello World 1</div>,
};

const tab2: TabData = {
    id: 'tab2',
    title: 'tab2',
    closable: true,
    content: <div>Hello World 2</div>,
};

const tab3: TabData = {
    id: 'tab3',
    title: 'tab3',
    closable: true,
    content: <div>Hello World 3</div>,
};

const tab4: TabData = {
    id: 'tab4',
    title: 'tab4',
    closable: true,
    content: <div>Hello World 4</div>,
};

const defaultLayout: LayoutData = {
    dockbox: {
        mode: 'horizontal',
        children: [
            {
                tabs: [tab1, tab2, tab3, tab4],
            },
        ],
    },
};

const DockApp = memo(() => {
    return (
        <div>
            <div className="flex justify-end p-1">
                <NavLink to="/">
                    <Button className="btn">Go to Home</Button>
                </NavLink>
            </div>
                <div onContextMenu={handleContextMenu}>
                    <DockLayout
                        ref={layoutRef}
                        defaultLayout={defaultLayout}
                        style={{
                            position: 'absolute',
                            left: 1,
                            top: 45,
                            right: 1,
                            bottom: 1,
                        }}
                    />
                    <DockContextMenu onOpenTab={() => {
                        layoutRef.current?.dockMove(tab4, 'tab1', 'middle');
                    }} />
                </div>
        </div>
    );
});

export default DockApp;
