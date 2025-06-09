import { API_BASE_URL, GET_USER, GET_USER_API } from "@/constants";
import type { UserState } from "@/main/model/user.model";
import { create } from "zustand";

// BroadcastChannel은 브라우저와 Electron 간 상태 동기화를 위한 채널이다.
const userChannel = new BroadcastChannel('user-store');

// 다른 창에서 전달된 상태 변경을 구독한다.
const subscribeToUserUpdates = (set: (partial: Partial<UserState>) => void) => {
  userChannel.onmessage = (event) => {
    set({ userName: event.data });
  };
};

// 상태 변경을 다른 창에 전파한다.
const broadcastUserUpdate = (userName: string) => {
  userChannel.postMessage(userName);
};

export const useUserStoreRestful = create<UserState>((set) => {
  subscribeToUserUpdates(set);

  return {
    userName: "Default",
    fetchUser: async () => {
      const data = await fetch(`${API_BASE_URL + GET_USER_API}`).then(res => res.json());
      set({ userName: data.name });
      broadcastUserUpdate(data.name);
    },
  };
});

export const useUserStoreIPC = create<UserState>((set) => {
  subscribeToUserUpdates(set);

  return {
    userName: "Default",
    fetchUser: async () => {
      const res = await window.electron.ipcRenderer.invoke(GET_USER);
      set({ userName: res.name });
      broadcastUserUpdate(res.name);
    },
  };
});
