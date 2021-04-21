import React, { useState, useCallback } from 'react';

import ChevronIcon from '@material-ui/icons/ChevronRight';

import { Button, Logo } from 'ui';

import { Guard } from 'shared/guards';

import SidebarLinks from './sidebar-links';
import SidebarPanel from './sidebar-panel';

import csx from './Sidebar.scss';

const Sidebar = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback((): void => {
    setOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return (
    <>
      <aside className={`${csx.sidebar} ${open ? csx.open : ''}`}>
        <div className={csx.content}>
          <figure className={csx.logo}>
            <Logo />
          </figure>

          <SidebarLinks />

          <Guard.Protected>
            <Button className={csx.toggleBtn} variant="icon" onClick={toggleOpen}>
              <ChevronIcon />
            </Button>
          </Guard.Protected>
        </div>
      </aside>

      {open && <SidebarPanel onClose={toggleOpen} />}
    </>
  );
};

export default Sidebar;
