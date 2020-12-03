import React from 'react';
import { NavLink } from 'react-router-dom';

import { Guard } from 'shared/guards';

import { Logo } from 'ui';

import csx from './Navbar.scss';

const Navbar = () => {
  return (
    <nav className={csx.navbar}>
      <div className={csx.wrapper}>
        <NavLink className={csx.logo} to="/">
          <figure>
            <Logo />
          </figure>
          <span>Jupi.io</span>
        </NavLink>

        <div className={csx.links}>
          <NavLink activeClassName={csx.activeLink} to="/app">
            App
          </NavLink>

          <Guard.Unprotected>
            <NavLink activeClassName={csx.activeLink} className={csx.register} to="/register">
              Register
            </NavLink>
            <NavLink activeClassName={csx.activeLink} className={csx.login} to="/login">
              Log In
            </NavLink>
          </Guard.Unprotected>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
