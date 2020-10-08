import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Logo } from 'ui';

import { BASE_LINKS, IMPORTANT_LINKS } from '.';

import Sidebar from './sidebar';
import SidebarTrigger from './sidebar-trigger';
import { Guard } from 'core/auth';

import csx from './Navbar.scss';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
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
          {BASE_LINKS.map(link => (
            <NavLink key={link.to} activeClassName={csx.activeLink} exact={true} {...link} />
          ))}
        </div>

        <div className={`${csx.links} ${csx.importantLinks}`}>
          {IMPORTANT_LINKS.map(link => (
            <NavLink key={link.to} activeClassName={csx.activeLink} {...link} />
          ))}
          <Guard.Unprotected>
            <div className={csx.unprotected}>
              <NavLink key={"/register"} activeClassName={csx.activeLink} to="/register" >Register</NavLink>
              <NavLink key={"/login"} activeClassName={csx.activeLink} to="/login" >Login</NavLink>
            </div>
          </Guard.Unprotected>
        </div>

        <SidebarTrigger active={sidebarOpen} onClick={toggleSidebar} />
      </div>

      {sidebarOpen && <Sidebar />}
    </nav>
  );
};

export default Navbar;
