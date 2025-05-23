import './App.css';
import Home from '@components/home';
import Other from '@components/other';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/other" element={<Other />} />
    </Routes>
</BrowserRouter>
);

export default App;
