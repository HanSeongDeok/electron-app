import { ipcMain, BrowserWindow } from "electron";

export const broadCastHandler = () => {
    ipcMain.on("broadcast-user-update", (_, userName: string) => {
        BrowserWindow.getAllWindows().forEach(win => {
            win.webContents.send("user-updated", userName);
        });
    });
}

