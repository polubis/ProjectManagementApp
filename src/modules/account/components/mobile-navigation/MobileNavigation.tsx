import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { MobileNavigation as UIMobileNavigation, Button, useMobileNavigationProvider } from 'ui';

import { useAuthProvider } from 'shared/providers/auth';

import csx from './MobileNavigation.scss';

const MobileNavigation = (): JSX.Element => {
  const { toggleOpen } = useMobileNavigationProvider();

  const { logOut } = useAuthProvider();

  return (
    <>
      <NavLink
        activeClassName={csx.active}
        className={csx.link}
        to="/account/general"
        onClick={toggleOpen}
      >
        General
      </NavLink>

      <NavLink
        activeClassName={csx.active}
        className={csx.link}
        to="/account/profile"
        onClick={toggleOpen}
      >
        Profile
      </NavLink>

      <NavLink className={`${csx.link} ${csx.backToApp}`} to="/app">
        Back to app
      </NavLink>

      <Button className={csx.logout} onClick={logOut}>
        LOGOUT
      </Button>
    </>
  );
};

const ConnectedMobileNavigation: FC = () => (
  <UIMobileNavigation className={csx.mobileNavigation} viewport="tablet">
    <MobileNavigation />
  </UIMobileNavigation>
);

export default ConnectedMobileNavigation;
