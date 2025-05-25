import { SEND_MAIN_PING } from "src/constants";

export const sendToPing = () => {
    window.electron.ipcRenderer.send(SEND_MAIN_PING, SEND_MAIN_PING)
};