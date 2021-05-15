import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Guard } from 'shared/guards';

import { MobileNavigation as UIMobileNavigation, Logo, useMobileNavigationProvider } from 'ui';

import csx from './MobileNavigation.scss';

const MobileNavigation = (): JSX.Element => {
  const { toggleOpen } = useMobileNavigationProvider();

  return (
    <>
      <NavLink activeClassName={csx.active} className={csx.link} to="/app">
        App
      </NavLink>

      <Guard.Unprotected>
        <NavLink
          activeClassName={csx.active}
          className={csx.link}
          to="/register"
          onClick={toggleOpen}
        >
          Register
        </NavLink>
        <NavLink activeClassName={csx.active} className={csx.link} to="/login" onClick={toggleOpen}>
          Log In
        </NavLink>
      </Guard.Unprotected>

      <NavLink className={csx.logo} to="/" onClick={toggleOpen}>
        <figure>
          <Logo />
        </figure>
        <span>Jupi.io</span>
      </NavLink>
    </>
  );
};

const ConnectedMobileNavigation: FC = () => (
  <UIMobileNavigation>
    <MobileNavigation />
  </UIMobileNavigation>
);

export default ConnectedMobileNavigation;
