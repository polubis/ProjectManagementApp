import React, { useCallback, useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthProvider } from 'core/auth';

import { Logo } from 'ui';

import Sidebar from './sidebar';
import SidebarTrigger from './sidebar-trigger';

import { BASE_LINKS, IMPORTANT_LINKS, Link } from '.';

import csx from './Navbar.scss';

const getLinksByAuthState = (authorized: boolean, pending: boolean) => (): Link[] => {
  if (pending) {
    return [];
  }

  if (authorized) {
    return IMPORTANT_LINKS.filter(
      ({ children }) => children !== 'Log In' && children !== 'Register',
    );
  }

  return IMPORTANT_LINKS;
};

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { authorized, pending } = useAuthProvider();

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
  }, []);

  const links = useMemo(getLinksByAuthState(authorized, pending), [authorized, pending]);

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
          {BASE_LINKS.map((link) => (
            <NavLink key={link.to} activeClassName={csx.activeLink} exact {...link} />
          ))}
        </div>

        <div className={`${csx.links} ${csx.importantLinks}`}>
          {links.map((link) => (
            <NavLink key={link.to} activeClassName={csx.activeLink} {...link} />
          ))}
        </div>

        <SidebarTrigger active={sidebarOpen} onClick={toggleSidebar} />
      </div>

      {sidebarOpen && <Sidebar />}
    </nav>
  );
};

export default Navbar;
