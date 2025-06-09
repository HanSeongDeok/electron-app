import type { IpcRendererAPI, IpcListenerAPI, IpcMainAPI } from '@type/ipc';

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRendererAPI;
      //ipcMain: IpcMainAPI;
      ipcListener: IpcListenerAPI;
    };
  }
}

export {};