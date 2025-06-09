// user Model 객체  
export type User = {
  name: string;
  role: string;
};

// user Model Zustand 상태 관리 객체
export type UserState = {
  userName: string | null;
  fetchUser: () => Promise<void>;
};