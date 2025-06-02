import './App.css';
import Home from '@components/home';
import Other from '@components/other';
import Test from '@components/test';
import { Route, Routes } from 'react-router-dom';
import NewWinOther from './renderer/components/newWinOther';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/other" element={<Other />} />
    <Route path="/other/new/:tabName" element={<NewWinOther />} />
    <Route path="/test" element={<Test />} />
  </Routes>
);

export default App;
