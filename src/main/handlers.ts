import { broadCastHandler } from "./ipc/broadcast.handler";
import { pingpongHandler } from "./ipc/pingpong.handler"
import { userHandler } from "./ipc/user.handler";

export const registerHandlers = () => {
    pingpongHandler();
    broadCastHandler();
    userHandler();
} 