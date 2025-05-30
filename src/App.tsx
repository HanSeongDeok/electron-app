import './App.css';
import Home from '@components/home';
import Other from '@components/other';
import Test from '@components/test';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/other" element={<Other />} />
    <Route path="/test" element={<Test />} />
  </Routes>
);

export default App;
