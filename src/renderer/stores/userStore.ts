import { API_BASE_URL, GET_USER, GET_USER_API } from "@/constants";
import type { UserState } from "@/main/model/user.model";
import { create } from "zustand";

export const useUserStoreRestful = create<UserState>((set, get) => ({
  userName: "Default",
  fetchUser: async () => {
    const data = await fetch(`${API_BASE_URL + GET_USER_API}`).then(res => res.json());
    set({ userName: data.name });
    //broadcastUserUpdate(data.name);
  },
}));

export const useUserStoreIPC = create<UserState>((set, get) => ({
  userName: "Default",
  fetchUser: async () => {
    const res = await window.electron.ipcRenderer.invoke(GET_USER);
    set({ userName: res.name });
    //broadcastUserUpdate(res.name);
  },
}));