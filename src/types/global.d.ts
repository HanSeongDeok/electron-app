import type { IpcRendererAPI } from '@types/ipc';

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRendererAPI;
    };
  }
}

export {};