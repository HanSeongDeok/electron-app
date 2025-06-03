import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const data = [
  { id: 1, name: "Item A", price: 1000 },
  { id: 2, name: "Item B", price: 2000 },
  { id: 3, name: "Item C", price: 3000 },
];

export const TableView = ({ name }: { name: string }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>{name}: ID</TableHead>
        <TableHead>{name}: Name</TableHead>
        <TableHead>{name}: Price (₩)</TableHead>
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