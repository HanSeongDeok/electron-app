import { contextBridge, ipcRenderer } from 'electron';
import type { IpcRendererEvent } from 'electron';
import type { IpcRendererAPI } from '@type/ipc'; 

const ipcApi: IpcRendererAPI = {
   send: (channel: string, data?: any) => {
      ipcRenderer.send(channel, data);
    },

    on: (channel: string, callback: (...args: any[]) => void) => {
      ipcRenderer.on(channel, (event: IpcRendererEvent, ...args: any[]) => callback(...args));
    },

    removeListener: (channel: string, callback: (...args: any[]) => void) => {
      ipcRenderer.removeListener(channel, callback);
    }
}

contextBridge.exposeInMainWorld('electron', {ipcRenderer: ipcApi});