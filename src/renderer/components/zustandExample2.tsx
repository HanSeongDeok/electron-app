import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { useCounterStore } from './zustandExample';
import { useUserStoreHandler } from '../handlers/userStoreHandler';


export default function UserInfo() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">View Page</h1>
        <NavLink to="/">
          <Button className="btn mt-3 mr-4">Go to Home</Button>
        </NavLink>
      </div>
      <button className='btn' onClick={useUserStoreHandler((s) => s.fetchUser)}>유저 불러오기</button>
      {<p>안녕하세요, {useUserStoreHandler((s) => s.userName)} {useCounterStore((s) => s.count)}님</p>}
    </div>
  );
}
