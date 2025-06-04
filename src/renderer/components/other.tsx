import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { TableView } from "@views/tableView";
import { openNewWindow } from "@handlers/ipcHandler";
import { userGroupState } from "@hooks/useGroupState";

const Other = memo(() => {
  const { groups, setGroups } = userGroupState();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">View Page</h1>
        <NavLink to="/">
          <Button className="btn mt-3 mr-4">Go to Home</Button>
        </NavLink>
      </div>
      {groups.map(group => (
        <Tabs key={group.id} value={group.activeTabId}
          onValueChange={(tabId) => {
            console.log('selected tabId for group\n', group.id, tabId);
            setGroups((prev) =>
              prev.map((g) =>
                g.id === group.id ? { ...g, activeTabId: tabId } : g
              )
            );
          }}>
          <TabsList className="grid w-full grid-cols-3">
            {group.tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}
                className="hover:bg-gray-800 transition-colors data-[state=active]:bg-red-500 text-white">
                {tab.title}
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    
                  </ContextMenuTrigger>
                  <ContextMenuContent className="bg-white text-black border border-gray-200 shadow-md p-1 rounded-md min-w-[12rem]">
                    <ContextMenuItem
                      onClick={() => openNewWindow(tab.id)}
                      className="hover:bg-gray-100 px-2 py-1.5 rounded text-xs">
                      새 창으로 열기
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </TabsTrigger>
            ))}
          </TabsList>
          {group.tabs.map(tab => (
            <TabsContent key={`${group.id}-${tab.id}`} value={tab.id}>
              <TableView name={tab.id} />
            </TabsContent>
          ))}
        </Tabs>
      ))}
      <p className="text-muted-foreground text-sm">
        이것은 테스트 문구 입니다.
      </p>
    </div>
  );
});

export default Other;