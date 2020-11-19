import React, { memo } from 'react';

import csx from './SidebarTrigger.scss';

namespace SidebarTrigger {
  export interface Props {
    active: boolean;
    onClick(): void;
  }
}

const SidebarTrigger = memo(
  ({ active, onClick }: SidebarTrigger.Props) => (
    <button
      className={`${csx.sidebarTrigger} ${active ? csx.active : csx.inactive}`}
      onClick={onClick}
    >
      <div />
      <div />
      <div />
    </button>
  ),
  (prev, next) => prev.active === next.active,
);

export default SidebarTrigger;
