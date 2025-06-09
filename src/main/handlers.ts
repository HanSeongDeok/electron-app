import { pingpongHandler } from "./ipc/pingpong.handler"
import { userHandler } from "./ipc/user.handler";

export const registerHandlers = () => {
    pingpongHandler();
    userHandler();
} 