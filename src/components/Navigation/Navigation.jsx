import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return `${css.link} ${isActive ? css.active : ""}`;
};

const Navigation = () => {
  return (
    <nav>
      <ul className={css.navButton}>
        <li>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
