import React from 'react';

import { Avatar } from '@material-ui/core';

import { Button } from 'shared/ui';

import { Protected, Unprotected } from 'core/auth';

import csx from './UserSection.scss';
import { NavLink } from 'react-router-dom';

export const UserSection = () => {
  return (
    <div className={csx.userSection}>
      <Protected>
        {({ user: { firstName, lastName }, logOut }) => (
          <>
            <div className={csx.details}>
              <span>Hi, {firstName}</span>
              <Avatar className={csx.avatar}>
                {firstName.charAt(0)} {lastName.charAt(0)}
              </Avatar>
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
