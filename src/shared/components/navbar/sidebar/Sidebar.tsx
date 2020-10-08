import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { usePortal } from 'utils';

import { BASE_LINKS, IMPORTANT_LINKS } from '..';

import { Guard } from "core/auth";

import csx from './Sidebar.scss';

const Sidebar = memo(
  () => {
    const render = usePortal();

    return render(
      <nav className={csx.sidebar}>
        {BASE_LINKS.map(link => (
          <NavLink key={link.to} activeClassName={csx.activeLink} exact={true} {...link} />
        ))}

        {IMPORTANT_LINKS.map(link => (
          <NavLink key={link.to} activeClassName={csx.activeLink} {...link} />
        ))}
        <Guard.Unprotected>
          <div>
            <NavLink key={"/register"} activeClassName={csx.activeLink} to="/register" >Register</NavLink>
            <NavLink key={"/login"} activeClassName={csx.activeLink} to="/login" >Login</NavLink>
          </div>
        </Guard.Unprotected>
      </nav>
    );
  },
  () => true
);

export default Sidebar;
