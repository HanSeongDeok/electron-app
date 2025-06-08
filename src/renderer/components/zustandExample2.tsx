import { create } from 'zustand';

type UserState = {
  user: string | null;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  fetchUser: async () => {
    const res = await fetch('/api/user');
    const data = await res.json();
    set({ user: data.name });
  },
}));

function UserInfo() {
  const user = useUserStore((s) => s.user);
  const fetchUser = useUserStore((s) => s.fetchUser);

  return (
    <div>
      <button onClick={fetchUser}>유저 불러오기</button>
      {user && <p>안녕하세요, {user}님</p>}
    </div>
  );
}
