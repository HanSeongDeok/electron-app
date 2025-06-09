import type { IpcRendererAPI, IpcListenerAPI, IpcMainAPI } from '@type/ipc';

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRendererAPI;
      //ipcMain: IpcMainAPI;  // 해당 IpcMain은 contextBridge가 불가능 하다.  
      ipcListener: IpcListenerAPI;
    };
  }
}

export { };