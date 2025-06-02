import { memo } from "react";
import { useParams } from "react-router-dom";
import { TableView } from "@views/tableView";

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

export default NewWinOther;