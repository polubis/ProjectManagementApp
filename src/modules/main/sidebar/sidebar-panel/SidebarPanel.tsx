import React from 'react';

import { Button } from '@material-ui/core';

import { Logo } from 'ui';

import SidebarLinks from '../sidebar-links';

import csx from './SidebarPanel.scss';

namespace SidebarPanel {
  export interface Props {
    onClose(): void;
  }
}

const renderLink: SidebarLinks.RenderLink = (icon, label) => {
  return (
    <Button className={csx.link}>
      {icon}
      <span>{label}</span>
    </Button>
  );
};

const SidebarPanel = ({ onClose }: SidebarPanel.Props) => {
  return (
    <div className={csx.sidebarPanel}>
      <div className={csx.logo} onClick={onClose}>
        <figure>
          <Logo />
        </figure>
        <span>Jupi.io</span>
      </div>

      <SidebarLinks renderLink={renderLink} />
    </div>
  );
};

export default SidebarPanel;
