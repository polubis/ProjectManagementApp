import React, { useState, useCallback } from 'react';

import { Button } from '@material-ui/core';
import { Logo } from 'ui';

import SidebarPanel from './sidebar-panel';
import SidebarLinks from './sidebar-links';

import csx from './Sidebar.scss';

const renderLink: SidebarLinks.RenderLink = (icon, label) => {
  return (
    <Button className={csx.link}>
      {icon}
      <span>{label}</span>
    </Button>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <aside className={csx.sidebar}>
      <div className={csx.sidebarContent}>
        <figure className={csx.logo} onClick={toggleOpen}>
          <Logo />
        </figure>

        <SidebarLinks renderLink={renderLink} />

        {open && <SidebarPanel onClose={toggleOpen} />}
      </div>
    </aside>
  );
};

export default Sidebar;
