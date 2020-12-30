import React from 'react';
import { NavLink } from 'react-router-dom';

import { MobileNavigation as UIMobileNavigation, Button } from 'ui';

import { useAuthProvider } from 'shared/providers/auth';

import csx from './MobileNavigation.scss';

const MobileNavigation = (): JSX.Element => {
  const { logOut } = useAuthProvider();

  return (
    <UIMobileNavigation className={csx.mobileNavigation} viewport="tablet">
      <NavLink activeClassName={csx.active} className={csx.link} to="/account/general">
        General
      </NavLink>

      <NavLink className={`${csx.link} ${csx.backToApp}`} to="/app">
        Back to app
      </NavLink>

      <Button className={csx.logout} onClick={logOut}>
        LOGOUT
      </Button>
    </UIMobileNavigation>
  );
};

export default MobileNavigation;
