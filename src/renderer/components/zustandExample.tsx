import { create } from 'zustand';

type CounterState = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

export const useCounterStore = create<CounterState>((set, get) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default function CounterComponent() {
  return (
    <div>
      <h1>Count: {useCounterStore((state) => state.count)}</h1>
      <button className = "btn" onClick={useCounterStore((state) => state.increase)}>+ 증가</button>
      <button className = "btn" onClick={useCounterStore((state) => state.decrease)}>- 감소</button>
    </div>
  );
}