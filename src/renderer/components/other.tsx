import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@images/components/ui/table";
import { Button } from "@images/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@images/components/ui/tabs";

const data = [
  { id: 1, name: "Item A", price: 1000 },
  { id: 2, name: "Item B", price: 2000 },
  { id: 3, name: "Item C", price: 3000 },
];

const TableView = ({name}: { name: string }) => (
  <div className="border rounded-md shadow-sm bg-white">
    <div className="flex items-center justify-between px-4 py-2 border-b bg-muted">
      <span className="text-sm font-medium">{name}.tsx</span>
    </div>
    <div className="p-4 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price (₩)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>{item.id}</TableCell>
              <TableCell style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>{item.name}</TableCell>
              <TableCell style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>{item.price.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const Other = memo(() => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Other Page</h2>
        <NavLink to="/">
          <Button variant="outline">Go to Home</Button>
        </NavLink>
      </div>

      <Tabs defaultValue="file1" className="w-[400px]">
        <TabsList className="flex gap-1">
          <TabsTrigger value="file1">file1.tsx</TabsTrigger>
          <TabsTrigger value="file2">file2.tsx</TabsTrigger>
          <TabsTrigger value="file3">file3.tsx</TabsTrigger>
        </TabsList>
        <TabsContent value="file1">
          <TableView name="file1" />
        </TabsContent>
        <TabsContent value="file2">
          <TableView name="file2" />
        </TabsContent>
        <TabsContent value="file3">
          <TableView name="file3" />
        </TabsContent>
      </Tabs>

      <p className="text-muted-foreground text-sm">
        이것은 테스트 문구 입니다.
      </p>
    </div>
  );
});

export default Other;
