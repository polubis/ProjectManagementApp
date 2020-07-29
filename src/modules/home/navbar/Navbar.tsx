import React from 'react';
import { NavLink } from 'react-router-dom';

import { Logo } from 'ui';

import csx from './Navbar.scss';

namespace Navbar {
  export interface Link {
    label: string;
    to: string;
  }
}

const BASE_LINKS: Navbar.Link[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' }
];

const IMPORTANT_LINKS: Navbar.Link[] = [
  { label: 'App', to: '/app' },
  { label: 'Register', to: '/register' },
  { label: 'Log In', to: '/login' }
];

const Navbar = () => {
  return (
    <nav className={csx.navbar}>
      <div className={csx.wrapper}>
        <div className={csx.logo}>
          <figure>
            <Logo />
          </figure>
          <span>Jupi.io</span>
        </div>

        <div className={`${csx.links} ${csx.baseLinks}`}>
          {BASE_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} activeClassName={csx.activeLink}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className={`${csx.links} ${csx.importantLinks}`}>
          {IMPORTANT_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
