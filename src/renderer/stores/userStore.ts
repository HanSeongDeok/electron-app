import { API_BASE_URL, GET_USER, GET_USER_API } from "@/constants";
import type { UserState } from "@/main/model/user.model";
import { create } from "zustand";
import { broadcastUserUpdate, listenUserUpdate } from "../handlers/broadCastHandler";

export const useUserStoreRestful = create<UserState>((set, get) => {
  listenUserUpdate((name) => set({ userName: name }));
  return {
    userName: "Default",
    fetchUser: async () => {
      const data = await fetch(`${API_BASE_URL + GET_USER_API}`).then(res => res.json());
      set({ userName: data.name });
      broadcastUserUpdate(data.name);
    },
  };
});

export const useUserStoreIPC = create<UserState>((set, get) => {
  listenUserUpdate((name) => set({ userName: name }));
  return {
    userName: "Default",
    fetchUser: async () => {
      let name = useUserStoreRestful.getState().userName;
      const res = await window?.electron?.ipcRenderer?.invoke(GET_USER);
      if (res == undefined) {
        set({ userName: name });
        if (name == null) {
          name = "Default";
        }
        broadcastUserUpdate(name);    
      } else {
        set({ userName: res.name });
        broadcastUserUpdate(res.name);
      }
    },
  };
});

