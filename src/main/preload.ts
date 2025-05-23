import { contextBridge, ipcRenderer } from 'electron';
import type { IpcRendererEvent } from 'electron';
import type { IpcRendererAPI, IpcListenerAPI } from '@type/ipc'; 

const ipcRendererApi: IpcRendererAPI = {
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

const ipcListenerApi: IpcListenerAPI = {
    listen: (event: Electron.IpcRendererEvent, message: string) => {
        console.log(event, message);
    }
}

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRendererApi,
  ipcListener: ipcListenerApi
});