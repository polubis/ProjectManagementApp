import React from 'react';
import { NavLink } from 'react-router-dom';

import { Avatar } from '@material-ui/core';

import { Button } from 'shared/ui';

import { Protected, Unprotected } from 'core/auth';

import csx from './UserSection.scss';

export const UserSection = () => {
  return (
    <div className={csx.userSection}>
      <Protected>
        {({ user: { email, username }, logOut }) => (
          <>
            <div className={csx.details}>
              <span>Hi, {username}</span>
              <Avatar className={csx.avatar}>{email.charAt(0).toUpperCase()}</Avatar>
            </div>

            <div className={csx.divider} />

            <span className={csx.logoutBtn} onClick={logOut}>
              Logout
            </span>
          </>
        )}
      </Protected>

      <Unprotected>
        <>
          <NavLink to="/login">
            <Button className={csx.logInBtn}>LOG IN</Button>
          </NavLink>

          <NavLink to="/register">
            <Button>CREATE ACCOUNT</Button>
          </NavLink>
        </>
      </Unprotected>
    </div>
  );
};
