import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">View Page</h1>
        <NavLink to="/">
          <Button className="btn mt-3 mr-4">Go to Home</Button>
        </NavLink>
      </div>
      <h1>Count: {useCounterStore((state) => state.count)}</h1>
      <button className = "btn" onClick={useCounterStore((state) => state.increase)}>+ 증가</button>
      <button className = "btn" onClick={useCounterStore((state) => state.decrease)}>- 감소</button>
    </div>
  );
}