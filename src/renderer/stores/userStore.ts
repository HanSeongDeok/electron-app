import { API_BASE_URL, GET_USER, GET_USER_API } from "@/constants";
import type { UserState } from "@/main/model/user.model";
import { create } from "zustand";

// BroadcastChannel은 브라우저와 Electron 간 상태 동기화를 위한 채널이다.
const userChannel = new BroadcastChannel('user-store');

// 창이 닫힐 때 채널을 정리한다.
window.addEventListener('beforeunload', () => {
  userChannel.close();
});

type UserMessage =
  | { type: 'request' }
  | { type: 'response'; userName: string }
  | { type: 'update'; userName: string };

// 다른 창에서 전달된 상태 변경을 구독한다.
const subscribeToUserUpdates = (
  set: (partial: Partial<UserState>) => void,
  get: () => UserState
) => {
  userChannel.onmessage = (event) => {
    const message = event.data as UserMessage;

    if (message.type === 'request') {
      const { userName } = get();
      if (userName) {
        userChannel.postMessage({ type: 'response', userName });
      }
    } else if (message.type === 'response' || message.type === 'update') {
      set({ userName: message.userName });
    }
  };
};

// 상태 변경을 다른 창에 전파한다.
const broadcastUserUpdate = (userName: string) => {
  const message: UserMessage = { type: 'update', userName };
  userChannel.postMessage(message);
};

const broadcastUserRequest = () => {
  const message: UserMessage = { type: 'request' };
  userChannel.postMessage(message);
};

export const useUserStoreRestful = create<UserState>((set, get) => {
  subscribeToUserUpdates(set, get);
  broadcastUserRequest();

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
  subscribeToUserUpdates(set, get);
  broadcastUserRequest();

  return {
    userName: "Default",
    fetchUser: async () => {
      const res = await window.electron.ipcRenderer.invoke(GET_USER);
      set({ userName: res.name });
      broadcastUserUpdate(res.name);
    },
  };
});
