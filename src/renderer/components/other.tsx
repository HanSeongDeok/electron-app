import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { TableView } from "@views/tableView";
import { openNewWindow } from "@handlers/ipcHandler";
import { userGroupState } from "../hooks/useGroupState";
import type { group } from "console";

const Other = memo(() => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Other Page</h1>
        <NavLink to="/">
          <Button className="btn mt-3 mr-4">Go to Home</Button>
        </NavLink>
      </div>

      <Tabs defaultValue="file1">
        <TabsList className="grid w-full grid-cols-3">
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <TabsTrigger
                value="file1"
                className="hover:bg-gray-800 transition-colors data-[state=active]:bg-gray-700 text-white">
                file1.tsx
              </TabsTrigger>
            </ContextMenuTrigger>
            <ContextMenuContent className="bg-white text-black border border-gray-200 shadow-md p-1 rounded-md min-w-[12rem]">
              <ContextMenuItem
                onClick={() => openNewWindow("file1")}
                className="hover:bg-gray-100 px-2 py-1.5 rounded text-xs">
                새 창으로 열기
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <TabsTrigger value="file2">file2.tsx</TabsTrigger>
          <TabsTrigger value="file3">file3.tsx</TabsTrigger>
        </TabsList>
        {userGroupState().groups.map(group => (
          group.tabs.map(tab => (
            <TabsContent key={`${group.id}-${tab.id}`} value={tab.id}>
              <TableView name={tab.id} />
            </TabsContent>
          ))
        ))}
        {/** <TabsContent value="file1">
          <TableView name="file1" />
        </TabsContent>
        <TabsContent value="file2">
          <TableView name="file2" />
        </TabsContent>
        <TabsContent value="file3">
          <TableView name="file3" />
        </TabsContent> */}
      </Tabs>
      <p className="text-muted-foreground text-sm">
        이것은 테스트 문구 입니다.
      </p>
    </div>
  );
});

export default Other;
