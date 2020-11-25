import React from 'react';

import { Backdrop } from 'ui';

import { usePortal } from 'utils';

import csx from './SidebarPanel.scss';

namespace SidebarPanel {
  export interface Props {
    onClose(): void;
  }
}

const SidebarPanel = ({ onClose }: SidebarPanel.Props): JSX.Element => {
  const render = usePortal();

  return (
    <>
      {render(<div className={csx.sidebarPanel}>siema</div>)}
      <Backdrop className={csx.backdrop} onClick={onClose} />
    </>
  );
};

export default SidebarPanel;
