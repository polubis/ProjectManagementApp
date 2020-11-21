import React from 'react';

import { Logo } from 'ui';

import SidebarLinks from './sidebar-links';

import csx from './Sidebar.scss';

const Sidebar = (): JSX.Element => (
  <aside className={csx.sidebar}>
    <div className={csx.content}>
      <figure className={csx.logo}>
        <Logo />
      </figure>

      <SidebarLinks />
    </div>
  </aside>
);

export default Sidebar;
