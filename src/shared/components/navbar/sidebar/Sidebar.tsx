import React from 'react';
import { NavLink } from 'react-router-dom';

import { BASE_LINKS, IMPORTANT_LINKS } from '../utils';

import csx from './Sidebar.scss';

const Sidebar = () => {
  return (
    <nav className={csx.sidebar}>
      <div className={csx.wrapper}>
        <div>
          {BASE_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} activeClassName={csx.activeLink} exact={true}>
              {label}
            </NavLink>
          ))}
        </div>

        <div>
          {IMPORTANT_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} activeClassName={csx.activeLink}>
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
