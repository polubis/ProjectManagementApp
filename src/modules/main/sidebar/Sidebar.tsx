import React, {useState, useCallback} from 'react';

import { Logo } from 'ui';
import { Button } from '@material-ui/core';

import { SidebarProps } from '.';

import {SidebarPanel} from './sidebar-panel';
import {SidebarLinks} from './sidebar-links';

import csx from './Sidebar.scss';

export const Sidebar = ({ basePath }: SidebarProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(
    () => {
      setOpen(!open)
    },
    [open],
  )

  const link = (icon, label) => {
  return(<Button>{icon}<div className={csx.tile}>{label}</div></Button>)
  }
  
  return (
    <aside className={csx.sidebar}>
      
      <div className={csx.sidebarContent}>
        <figure className={csx.logo} onClick={toggleOpen}>
          <Logo />
        </figure>

        {open && <SidebarPanel basePath={basePath} close={toggleOpen}/>}
        
        <SidebarLinks basePath={basePath} component={(icon,label) => link(icon,label)}/>
        
      </div>
    </aside>
  );
};

