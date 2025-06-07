import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import Teams from './pages/Teams';
import './styles/main.css';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
