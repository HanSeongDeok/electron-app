import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import type { IpcMain, IpcMainEvent, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';
import type { IpcRendererAPI, IpcListenerAPI, IpcMainAPI } from '@type/ipc';

const ipcRendererApi: IpcRendererAPI = {
  send: (channel: string, data?: any) => {
    ipcRenderer.send(channel, data);
  },

  on: (channel: string, callback: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (event: IpcRendererEvent, ...args: any[]) => callback(...args));
  },

  removeListener: (channel: string, callback: (...args: any[]) => void) => {
    ipcRenderer.removeListener(channel, callback);
  },

  invoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args);
  },
}

const ipcListenerApi: IpcListenerAPI = {
  listen: (event: Electron.IpcRendererEvent, message: string) => {
    console.log(event, message);
  },
}

// Main을 활용한 contextBridge는 사용할 수 없음
const ipcMainApi: IpcMainAPI = {
  on: (channel, listener) => {
    ipcMain.on(channel, (event: IpcMainEvent, ...args: any[]) => {
      listener(event, ...args);
    });
  },

  handle: (channel, listener) => {
    ipcMain.handle(channel, (event: IpcMainInvokeEvent, ...args: any[]) => {
      return listener(event, ...args);
    });
  }
}

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRendererApi,
  ipcListener: ipcListenerApi,
  //ipcMain: ipcMainApi,
});