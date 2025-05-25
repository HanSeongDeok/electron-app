import { memo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@images/components/ui/table";
import { Button } from "@images/components/ui/button";

const data = [
  { id: 1, name: "Item A", price: 1000 },
  { id: 2, name: "Item B", price: 2000 },
  { id: 3, name: "Item C", price: 3000 },
];

// TableView 단일 컴포넌트
const TableView = () => (
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
);

// 분리 가능한 ViewWrapper
const ViewWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [detached, setDetached] = useState(false);
  const popupRef = useRef<Window | null>(null);

  const handleDetach = () => {
    const popup = window.open("", "_blank", "width=600,height=400");
    if (!popup) return;
    popupRef.current = popup;
    setDetached(true);

    const html = `
      <html>
        <head>
          <title>${title}</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="p-4 font-sans">
          <h2 class="text-lg font-bold mb-4">${title}</h2>
          <div id="table-container"></div>
          <button onclick="window.close()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Return</button>
          <script>
            document.getElementById("table-container").innerHTML = \`${document.getElementById(title)?.innerHTML}\`;
          </script>
        </body>
      </html>
    `;
    popup.document.write(html);
    popup.document.close();
  };

  const handleReturn = () => {
    popupRef.current?.close();
    setDetached(false);
  };

  return (
    <div className="border rounded-xl shadow p-4 space-y-4" id={title}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{title}</h3>
        {!detached ? (
          <Button variant="outline" onClick={handleDetach}>
            Detach
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleReturn}>
            Return
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

const Other = memo(() => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Other Page</h2>
        <NavLink to="/">
          <Button variant="outline">Go to Home</Button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ViewWrapper title="View 1">
          <TableView />
        </ViewWrapper>
        <ViewWrapper title="View 2">
          <TableView />
        </ViewWrapper>
        <ViewWrapper title="View 3">
          <TableView />
        </ViewWrapper>
      </div>

      <p className="text-muted-foreground text-sm">
        각 View는 VS Code처럼 분리 및 복귀가 가능합니다.
      </p>
    </div>
  );
});

export default Other;
