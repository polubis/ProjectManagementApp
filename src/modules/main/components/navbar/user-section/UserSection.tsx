import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, useMenu, Menu, Img } from 'ui';

import { Guard } from 'shared/guards';

import Notifications from './notifications';
import UserDetails from './user-details';

import csx from './UserSection.scss';

const paperProps = {
  style: {
    transform: 'translateX(5%) translateY(3%)',
  },
};

const UserSection = (): JSX.Element => {
  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu();

  return (
    <div className={csx.userSection}>
      <Guard.Protected>
        {({ user: { username, githubAvatarUrl } }) => (
          <>
            <div className={csx.details} onClick={openMenu}>
              <Img className={csx.avatar} src={githubAvatarUrl} size="50px:50px">
                {username.charAt(0).toUpperCase()}
              </Img>
              <span>Hi, {username}</span>
            </div>

            {menuOpen && (
              <Menu
                anchorEl={anchorEl}
                keepMounted={false}
                width={326}
                onClose={closeMenu}
                PaperProps={paperProps}
              >
                <UserDetails />
              </Menu>
            )}

            <div className={csx.divider} />

            <Notifications />
          </>
        )}
      </Guard.Protected>

      <Guard.Unprotected>
        <>
          <NavLink to="/login">
            <Button className={csx.logInBtn}>LOG IN</Button>
          </NavLink>

          <NavLink to="/register">
            <Button>CREATE ACCOUNT</Button>
          </NavLink>
        </>
      </Guard.Unprotected>
    </div>
  );
};

export default UserSection;
