import React from 'react';

import ChevronIcon from '@material-ui/icons/ChevronRight';

import { Button, Logo } from 'ui';

import { Guard } from 'shared/guards';

import SidebarLinks from './sidebar-links';
import SidebarPanel from './sidebar-panel';
import SidebarProvider, { useSidebarProvider } from './SidebarProvider';

import csx from './Sidebar.scss';

const Sidebar = (): JSX.Element => {
  const { open, toggleOpen } = useSidebarProvider();

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

export default (): JSX.Element => (
  <SidebarProvider>
    <Sidebar />
  </SidebarProvider>
);
