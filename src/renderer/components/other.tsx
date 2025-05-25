import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@images/components/ui/table";
import { Button } from "@images/components/ui/button";

const data = [
  { id: 1, name: "Item A", price: 1000 },
  { id: 2, name: "Item B", price: 2000 },
  { id: 3, name: "Item C", price: 3000 },
];

const Other = memo(() => {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Other Page</h2>
        <NavLink to="/">
          <Button variant="outline">Go to Home</Button>
        </NavLink>
      </div>

      <div className="border rounded-xl overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price (₩)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.price.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-muted-foreground text-sm">
        이 테이블은 ShadCN UI와 Tailwind로 구성된 예제입니다.
      </p>
    </div>
  );
});

export default Other;
