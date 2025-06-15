import { Button } from '@/components/ui/button';
import DockLayout from 'rc-dock';
import type { LayoutData, TabData, PanelData } from 'rc-dock';
import { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { handleContextMenu, layoutRef } from '@handlers/contextMenuHandler';
import { NewWindowMenu } from './menus/dockContextMenu';
import { useContextMenuStore, useTabStore } from '../stores/contextMenuStore';
import { openNewWindow } from '../handlers/ipcHandler';


//TODO 테스트 급하게 
export const TEST = memo(() => {
    return (
        <div className="p-2 text-2xl">
            <p>Hello Wow Test 이것은 Tab1의 내용이다.</p>
        </div>
    );
})

const main: TabData = {
    id: 'main',
    title: 'main',
    closable: false,
    content: <div>Hello World 1</div>,
};

const tab1: TabData = {
    id: 'tab1',
    title: 'tab1',
    closable: true,
    content: <TEST />,
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
                id: 'main-panel',
                tabs: [main, tab1, tab2, tab3, tab4],
            },
        ],
    },
};

const tabs: Record<string, TabData> = {
    main,
    tab1,
    tab2,
    tab3,
    tab4,
};

const DockApp = memo(() => {
    const setTabTemp = useTabStore(s => s.setTabTemp);
    const tabTemp = useTabStore(s => s.tabTemp);
    const [currentLayout, setCurrentLayout] = useState<LayoutData>(() => {
        const savedLayout = localStorage.getItem('dock-layout');
        return savedLayout ? JSON.parse(savedLayout) : defaultLayout;
    });

    // 레이아웃 변경 감지 및 저장
    useEffect(() => {
        const saveLayout = () => {
            if (layoutRef.current) {
                const layout = layoutRef.current.getLayout();
                // 순환 참조를 제거하기 위해 필요한 데이터만 복사
                const layoutCopy = {
                    dockbox: {
                        mode: layout.dockbox.mode,
                        children: layout.dockbox.children.map(child => {
                            if ('tabs' in child) {
                                return {
                                    id: child.id,
                                    tabs: (child as PanelData).tabs.map((tab: TabData) => ({
                                        id: tab.id,
                                        title: tab.title,
                                        closable: tab.closable
                                    }))
                                };
                            }
                            return { id: child.id };
                        })
                    }
                };
                localStorage.setItem('dock-layout', JSON.stringify(layoutCopy));
            }
        };

        // 5초마다 레이아웃 저장
        const interval = setInterval(saveLayout, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const bc = new BroadcastChannel('tab_channel');
        bc.onmessage = (event) => {
            if (event.data?.type === 'SAVE_TAB_TEMP') {
                setTabTemp(event.data.data);
            }
        };

        return () => bc.close();
    }, []);

    useEffect(() => {
        if (tabTemp === "go") {
            layoutRef.current?.dockMove(tabs["tab1"], 'main', 'after-tab');
        }
    }, [tabTemp]);

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
                <NewWindowMenu
                    onOpenTab={(tabId) => {
                        const test = useContextMenuStore.getState().clickedElementId;
                        console.log(test)
                        layoutRef.current?.dockMove(tabs[tabId], 'main', 'after-tab');
                    }}
                    openNewWindow={(tabId) => {
                        console.log(tabId)
                        if(tabId === 'main'){
                        } else {
                            layoutRef.current?.dockMove(tabs[tabId], null, 'remove');
                        }
                        openNewWindow(tabId);
                    }}
                />
            </div>
        </div>
    );
});

export default DockApp;
