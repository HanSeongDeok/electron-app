const channel = new BroadcastChannel("user-sync");
const bc = new BroadcastChannel('tab_state_channel');

export function broadcastUserUpdate(name: string) {
  channel.postMessage({ type: "user-update", name });
}

export function listenUserUpdate(callback: (name: string) => void) {
  channel.onmessage = (event) => {
    const { type, name } = event.data;
    if (type === "user-update") {
      callback(name);
    }
  };
}
