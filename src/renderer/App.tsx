import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { Menu } from './components/Menu';
import { Test } from './components/Test';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}
