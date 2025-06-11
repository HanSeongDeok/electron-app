import { useUserStoreIPC, useUserStoreRestful } from "../stores/userStore";

const isElectron = !!(window && window.process && window.process.type);
export const useUserStoreHandler = isElectron ?
     useUserStoreIPC :
     useUserStoreRestful;

