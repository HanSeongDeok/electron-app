import { SEND_MAIN_PING } from "src/constants"

export const sendToMain = () => {
  window.electron.ipcRenderer.send(SEND_MAIN_PING, SEND_MAIN_PING)
}

export const openNewWindow = (tab: string) => {
  window.open(`/other/new/${tab}`, "_blank", "width=600,height=400");
}