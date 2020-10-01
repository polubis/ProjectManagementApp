import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { usePortal } from 'utils';

import { BASE_LINKS, IMPORTANT_LINKS } from '..';

import csx from './Sidebar.scss';

const Sidebar = memo(
  () => {
    const render = usePortal();

    return render(
      <nav className={csx.sidebar}>
        {BASE_LINKS.map(link => (
          <NavLink key={link.to} activeClassName={csx.activeLink} exact={true} {...link} />
        ))}

        {IMPORTANT_LINKS.map(link => (
          <NavLink key={link.to} activeClassName={csx.activeLink} {...link} />
        ))}
      </nav>
    );
  },
  () => true
);

export default Sidebar;
