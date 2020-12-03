import React from 'react';

import { Breadcrumbs } from 'shared/components';

import UserSection from './user-section';

import csx from './Navbar.scss';

const Navbar = (): JSX.Element => {
  return (
    <nav className={csx.navbar}>
      <Breadcrumbs className={csx.breadcrumbs} divider=">" />

      <div className={csx.wrapper}>
        <UserSection />
      </div>
    </nav>
  );
};

export default Navbar;
