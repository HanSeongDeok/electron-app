import { Button } from '@/components/ui/button';
import { GET_USER } from '@/constants';
import { NavLink } from 'react-router-dom';
import { create } from 'zustand';
import { useCounterStore } from './zustandExample';

type UserState = {
  user: string | null;
  fetchUser: () => Promise<void>;
};

const useUserStore = create<UserState>((set) => ({
  user: "Default",
  fetchUser: async () => {
    const res = await fetch('/api/user');
    const data = await res.json();
    set({ user: data.name });
  },
}));

const useUserStore2 = create<UserState>((set, get) => ({
  user: "Default",
  fetchUser: async () => {
    const res = await window.electron.ipcRenderer.invoke(GET_USER);
    set({ user: res.name });
  },
}));

export default function UserInfo() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">View Page</h1>
        <NavLink to="/">
          <Button className="btn mt-3 mr-4">Go to Home</Button>
        </NavLink>
      </div>
      <button className='btn' onClick={useUserStore2((s) => s.fetchUser)}>유저 불러오기</button>
      {<p>안녕하세요, {useUserStore2((s) => s.user)} {useCounterStore((s) => s.count)}님</p>}
    </div>
  );
}
