import type { IpcRendererAPI } from '@/type/ipc';

declare global {
  interface Window {
    electron: {
      ipcRenderer: IpcRendererAPI;
    };
  }
}

export {};