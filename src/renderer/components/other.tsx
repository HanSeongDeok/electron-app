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

const TableView = ({ name }: { name: string }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price (₩)</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.price.toLocaleString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const Other = memo(() => {
  return (
    <div>
      <h2>Other Page</h2>
      <NavLink to="/" className="fixed top-[25px] right-[10px]">
        <Button>Go to Home</Button>
      </NavLink>
      <Tabs defaultValue="file1">
        <TabsList>
          <TabsTrigger value="file1">file1.tsx</TabsTrigger>
          <TabsTrigger value="file2">file2.tsx</TabsTrigger>
          <TabsTrigger value="file3">file3.tsx</TabsTrigger>
        </TabsList >
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
