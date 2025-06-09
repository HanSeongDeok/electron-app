export interface IpcRendererAPI {
  send: (channel: string, data?: any) => void;
  on: (channel: string, callback: (...args: any[]) => void) => void;
  removeListener: (channel: string, callback: (...args: any[]) => void) => void;
  invoke: (channel: string, ...args: any[]) => Promise<any>;
}

// 해당 API는 contextBridge에 활용할 수 없다. 
export interface IpcMainAPI {
  handle: (channel: string, handler: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any) => void;
  on: (channel: string, listener: (event: Electron.IpcMainEvent, ...args: any[]) => void) => void;
}

export interface IpcListenerAPI {
  listen: (event: Electron.IpcRendererEvent, message: string) => void;
}