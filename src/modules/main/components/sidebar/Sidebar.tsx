import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Logo } from 'ui';

import SidebarLinks from './sidebar-links';
import SidebarPanel from './sidebar-panel';

import csx from './Sidebar.scss';

const Sidebar = (): JSX.Element => {
  const { location } = useHistory();

  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback((): void => {
    setOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      <aside className={`${csx.sidebar} ${open ? csx.open : ''}`}>
        <div className={csx.content}>
          <figure className={csx.logo} onClick={toggleOpen}>
            <Logo />
          </figure>

          <SidebarLinks />
        </div>
      </aside>

      {open && <SidebarPanel onClose={toggleOpen} />}
    </>
  );
};

export default Sidebar;
