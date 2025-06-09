import { PING_PONG_EVENT, RECIEVE_REACT_PONG, SEND_MAIN_PING } from "@/constants";
import { ipcMain } from "electron";

export const pingpongHandler = () => {
    ipcMain.on(SEND_MAIN_PING, (event, args) => {
        console.log(args)
        event.reply(RECIEVE_REACT_PONG,
            PING_PONG_EVENT, RECIEVE_REACT_PONG) // event // message 
    });
}