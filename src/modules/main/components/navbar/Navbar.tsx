import React from 'react';
import { useLocation } from 'react-router';

import UserSection from './user-section';
import BreadCrumbs from './bread-crumbs';

import csx from './Navbar.scss';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={csx.navbar}>
      <BreadCrumbs pathname={location.pathname} />

      <div className={csx.wrapper}>
        <UserSection />
      </div>
    </nav>
  );
};

export default Navbar;
