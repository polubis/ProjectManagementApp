import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'ui';

import { useAuthProvider } from 'shared/providers/auth';

import csx from './Navigation.scss';

const Navigation = memo(
  (): JSX.Element => {
    const { logOut } = useAuthProvider();

    return (
      <div className={csx.navigation}>
        <nav className={csx.links}>
          <span className={csx.version}>Production environment - version 2.9</span>

          <span className={csx.label}>Settings</span>

          <NavLink activeClassName={csx.active} className={csx.link} to="/account/general">
            General
          </NavLink>

          <NavLink activeClassName={csx.active} className={csx.link} to="/account/profile">
            Profile
          </NavLink>

          <NavLink className={`${csx.link} ${csx.backToApp}`} to="/app">
            Back to app
          </NavLink>

          <Button className={csx.logout} onClick={logOut}>
            LOGOUT
          </Button>
        </nav>
      </div>
    );
  },
  () => true
);

export default Navigation;
