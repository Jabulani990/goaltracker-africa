import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">⚽ GoalTracker Africa</div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''}>News</NavLink>
        <NavLink to="/teams" className={({ isActive }) => isActive ? 'active' : ''}>Teams</NavLink>
      </div>
    </nav>
  );
}
// Ensuring Navbar.js integrity
