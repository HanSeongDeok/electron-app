import { useEffect } from "react";
import { RECIEVE_REACT_PONG } from "src/constants";

export const usePingPong = () =>
  useEffect(() => {
    if (!window.electron?.ipcListener) {
      console.warn('This is not Electron environment.');
      return;
    }

    const listener = window.electron.ipcListener.listen;
    window.electron.ipcRenderer.on(RECIEVE_REACT_PONG, listener);

    return () => {
      window.electron.ipcRenderer.removeListener(RECIEVE_REACT_PONG, listener);
    };
  }, []);
