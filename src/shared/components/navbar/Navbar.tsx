import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Logo } from 'ui';

import { BASE_LINKS, IMPORTANT_LINKS } from './utils';

import { Sidebar } from './sidebar';
import { SidebarTrigger } from './sidebar-trigger';

import csx from './Navbar.scss';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((sidebarOpen) => !sidebarOpen);
  }, []);

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
            <NavLink key={to} to={to} activeClassName={csx.activeLink} exact={true}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className={`${csx.links} ${csx.importantLinks}`}>
          {IMPORTANT_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} activeClassName={csx.activeLink}>
              {label}
            </NavLink>
          ))}
        </div>
        <SidebarTrigger sidebarOpen={sidebarOpen} setSidebarOpen={handleSidebarToggle} />
      </div>
      {sidebarOpen ? <Sidebar /> : null}
    </nav>
  );
};

export default Navbar;
