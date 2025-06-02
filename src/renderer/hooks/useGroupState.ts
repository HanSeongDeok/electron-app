import { useState, useEffect } from "react";

type Tab = {
    id: string;
    title: string;
};

type TabGroup = {
    id: string;
    tabs: Tab[];
    activeTabId: string;
};

const defaultGroup: TabGroup = {
    id: "group1",
    tabs: [
        { id: "file1", title: "file1.tsx" },
        { id: "file2", title: "file2.tsx" },
        { id: "file3", title: "file3.tsx" },
    ],
    activeTabId: "file1"
}

export const userGroupState = () => {
    const [groups, setGroups] = useState<TabGroup[]>(() => {
        const saved = localStorage.getItem("tabGroups");
        return saved ? JSON.parse(saved) : [defaultGroup];
    });

    useEffect(() => {
        localStorage.setItem("tabGroups", JSON.stringify(groups));
    }, [groups]);

    return { groups, setGroups };
}

