import './App.css';
import Home from '@components/home';
import Other from '@components/other';
import Test from '@components/test';
import { Route, Routes } from 'react-router-dom';
import NewWinOther from './renderer/components/newWinOther';
import DockApp from './renderer/components/dock';
import MosaicApp from './renderer/components/mosaic';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/other" element={<Other />} />
    <Route path="/other/new/:tabName" element={<NewWinOther />} />
    <Route path="/test" element={<Test />} />
    <Route path="/dock" element={<DockApp />} />
    <Route path="/mosaic" element={<MosaicApp/>}/>
  </Routes>
);

export default App;
