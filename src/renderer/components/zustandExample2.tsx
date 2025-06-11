import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { useCounterStore } from './zustandExample';
import { useUserStoreIPC, useUserStoreRestful } from '../stores/userStore';
import { useEffect } from 'react';


export default function UserInfo() {
  useEffect(() => {
    useUserStoreRestful.getState().fetchUser();
    useUserStoreIPC.getState().fetchUser();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">View Page</h1>
        <NavLink to="/">
          <Button className="btn mt-3 mr-4">Go to Home</Button>
        </NavLink>
      </div>
      <button className='btn' onClick={() => {
        useUserStoreRestful.getState().fetchUser();
        useUserStoreIPC.getState().fetchUser();
      }}>유저 불러오기</button>
      {<p>안녕하세요 , {useUserStoreRestful((s) => s.userName)} {useCounterStore((s) => s.count)}님</p>}
      {<p>안녕하세요 , {useUserStoreIPC((s) => s.userName)} {useCounterStore((s) => s.count)}님</p>}
    </div>
  );
}
