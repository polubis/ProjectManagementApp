import React, { memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthProvider } from 'core/auth';

import { usePortal } from 'utils';

import { BASE_LINKS, IMPORTANT_LINKS, Link } from '..';

import csx from './Sidebar.scss';

const getLinksByAuthState = (authorized: boolean, pending: boolean) => (): Link[] => {
  if (pending) {
    return [];
  }

  if (authorized) {
    return IMPORTANT_LINKS.filter(
      ({ children }) => children !== 'Log In' && children !== 'Register',
    );
  }

  return IMPORTANT_LINKS;
};

const Sidebar = memo(
  () => {
    const render = usePortal();
    const { authorized, pending } = useAuthProvider();

    const links = useMemo(getLinksByAuthState(authorized, pending), [authorized, pending]);

    return render(
      <nav className={csx.sidebar}>
        {BASE_LINKS.map((link) => (
          <NavLink key={link.to} activeClassName={csx.activeLink} exact {...link} />
        ))}

        {links.map((link) => (
          <NavLink key={link.to} activeClassName={csx.activeLink} {...link} />
        ))}
      </nav>,
    );
  },
  () => true,
);

export default Sidebar;
