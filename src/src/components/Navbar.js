import { NavLink } from 'react-router-dom';
import './navbar.css'; // You can create styling here

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''}>News</NavLink>
      <NavLink to="/teams" className={({ isActive }) => isActive ? 'active' : ''}>Teams</NavLink>
    </nav>
  );
}
