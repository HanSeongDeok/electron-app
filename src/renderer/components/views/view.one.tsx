import { memo, useEffect } from "react";
import { DockLayout, type LayoutData, type TabData } from "rc-dock";
import { handleContextMenu, layoutRef } from "../../handlers/contextMenuHandler";
import { NewWindowMenu } from "../menus/dockContextMenu";
import { TEST } from "../dock";

//TODO 테스트 급하게 
const tab1: TabData = {
  id: 'tab1',
  title: 'tab1',
  closable: true,
  content: <TEST />,
};

const tabs: Record<string, TabData> = {
    tab1,
};

const defaultLayout: LayoutData = {
    dockbox: {
        mode: 'horizontal',
        children: [
            {
                id: 'main-panel',
                tabs: [tab1],
            },
        ],
    },
};

const ViewOne = memo(() => {
  useEffect(() => {
    const bc = new BroadcastChannel('tab_channel');

    window.addEventListener('beforeunload', () => {
        bc.postMessage({
            type: 'SAVE_TAB_TEMP',
            data: 'go', //useContextMenuStore.getState().clickedElementId
        });
    });

    return () => bc.close();
}, []);
  return (
        <div>
            <div onContextMenu={handleContextMenu}>
                <DockLayout
                    ref={layoutRef}
                    defaultLayout={defaultLayout}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                    }}
                />
                <NewWindowMenu
                    onOpenTab={(tabId) => {
                        layoutRef.current?.dockMove({ ...tabs[tabId] }, 'main', 'after-tab');
                    }}
                    openNewWindow={(tabId) => {
                        console.log(tabId)
                    }}
                />
            </div>
        </div>
    );
})

export default ViewOne;