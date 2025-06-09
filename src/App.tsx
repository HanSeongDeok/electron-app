import './App.css';
import Home from '@components/home';
import Other from '@components/other';
import Test from '@components/test';
import { Route, Routes } from 'react-router-dom';
import NewWinOther from './renderer/components/newWinOther';
import DockApp from './renderer/components/dock';
import MosaicApp from './renderer/components/mosaic';
import CounterComponent from './renderer/components/zustandExample';
import UserInfo from './renderer/components/zustandExample2';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/other" element={<Other />} />
    <Route path="/other/new/:tabName" element={<NewWinOther />} />
    <Route path="/test" element={<Test />} />
    <Route path="/dock" element={<DockApp />} />
    <Route path="/mosaic" element={<MosaicApp/>}/>
    <Route path="/Zustand-1" element={<CounterComponent/>}/>
    <Route path="/Zustand-2" element={<UserInfo/>}/>
  </Routes>
);

export default App;
