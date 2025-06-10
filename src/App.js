import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import Teams from './pages/Teams';
import NotFound from './pages/NotFound';
import './styles/main.css';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
// This is a dummy comment to force re-sync
export default App;
