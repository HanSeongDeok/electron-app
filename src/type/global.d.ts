import type { IpcRendererAPI, IpcListenerAPI } from '@type/ipc';

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRendererAPI;
      ipcListener: IpcListenerAPI;
    };
  }
}

export {};