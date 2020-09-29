import React from 'react';
import { NavLink } from 'react-router-dom';

import { BASE_LINKS, IMPORTANT_LINKS } from '..';

import csx from './Sidebar.scss';

const Sidebar = () => {
  return (
    <nav className={csx.sidebar}>
      <div className={csx.wrapper}>
        <div>
          {BASE_LINKS.map(link => (
            <NavLink key={link.to} activeClassName={csx.activeLink} exact={true} {...link} />
          ))}
        </div>

        <div>
          {IMPORTANT_LINKS.map(link => (
            <NavLink key={link.to} activeClassName={csx.activeLink} {...link} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
