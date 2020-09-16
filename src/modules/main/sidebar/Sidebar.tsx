import React, { useState, useCallback } from 'react';

import { Logo, Button } from 'ui';

import SidebarPanel from './sidebar-panel';
import SidebarLinks from './sidebar-links';

import csx from './Sidebar.scss';

namespace Sidebar {
  export interface Props {
    basePath: string;
  }
}

const Sidebar = ({ basePath }: Sidebar.Props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const renderLink: SidebarLinks.Children = useCallback((icon, label) => {
    return (
      <Button theme="primaryTransparent" className={csx.link}>
        {icon}
        <span>{label}</span>
      </Button>
    );
  }, []);

  return (
    <aside className={csx.sidebar}>
      <div className={csx.sidebarContent}>
        <figure className={csx.logo} onClick={toggleOpen}>
          <Logo />
        </figure>

        <SidebarLinks basePath={basePath}>{renderLink}</SidebarLinks>

        {open && <SidebarPanel basePath={basePath} onClose={toggleOpen} />}
      </div>
    </aside>
  );
};

export default Sidebar;
