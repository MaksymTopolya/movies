import { FC } from 'react';
import css from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';
import Login from '../components/Login/Login';

const Navigation: FC = () => {
  return (
    <div className={css.container}>
      <NavLink to="/" className={css.title}>
        Filmik
      </NavLink>
      <div className={css.boxes}>
        <div className={css.moviesBox}>
          <NavLink
            to="/topRated"
            className={({ isActive }) =>
              `${css.navLink} ${isActive ? css.navLink_active : ''}`
            }
          >
            Top Rated Movies
          </NavLink>

          <NavLink
            to="/upcoming"
            className={({ isActive }) =>
              `${css.navLink} ${isActive ? css.navLink_active : ''}`
            }
          >
            Upcoming Movies
          </NavLink>
        </div>
        <div className={css.serialsBox}>
          <NavLink
            to="/serials"
            className={({ isActive }) =>
              `${css.navLink} ${isActive ? css.navLink_active : ''}`
            }
          >
            Serials
          </NavLink>

          <NavLink
            to="/serials/topRated"
            className={({ isActive }) =>
              `${css.navLink} ${isActive ? css.navLink_active : ''}`
            }
          >
            Top Rated Serials
          </NavLink>
        </div>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.navLink_active : ''}`
          }
        >
          Search
        </NavLink>
        <Login />
      </div>
    </div>
  );
};

export default Navigation;
