import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
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
});
