export interface IpcRendererAPI {
  send: (channel: string, data?: any) => void;
  on: (channel: string, callback: (...args: any[]) => void) => void;
  removeListener: (channel: string, callback: (...args: any[]) => void) => void;
}

export interface IpcListenerAPI {
  listen: (event: Electron.IpcRendererEvent, message: string) => void;
}