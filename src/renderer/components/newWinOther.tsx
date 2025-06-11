import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TableView } from "@views/tableView";
import { DockLayout, type LayoutData, type TabData } from "rc-dock";
import { handleContextMenu, layoutRef } from "../handlers/contextMenuHandler";
import { NewWindowMenu } from "./menus/dockContextMenu";
import { useContextMenuStore } from "../stores/contextMenuStore";

const NewWinOther = memo(() => {
  const { tabName } = useParams<{ tabName: string }>();
  const validTabName = tabName && ["file1", "file2", "file3"].includes(tabName)
    ? tabName
    : "file1";

  return <div className="p-4">
    <h1 className="text-xl font-bold mb-4">{validTabName} View</h1>
    <TableView name={validTabName} />
  </div>
});

//TODO 테스트 급하게 
const TEST = memo(() => {
  return (
    <div>
      <p>Hello Wow Test 이것은 Tab1의 내용이다.</p>
    </div>
  );
})

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

const TabTest1 = memo(() => {
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
                        left: 1,
                        top: 45,
                        right: 1,
                        bottom: 1,
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

export default TabTest1;