import { useEffect } from "react";
import { RECIEVE_REACT_PONG } from "src/constants";

export const usePingPong = () => useEffect(() => {
    const listener = window.electron.ipcListener.listen;
    window.electron.ipcRenderer.on(RECIEVE_REACT_PONG, listener);
    
    return () => {
      window.electron.ipcRenderer.removeListener(RECIEVE_REACT_PONG, listener);
    };
  }, []);
