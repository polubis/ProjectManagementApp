import React, { ReactNode } from 'react';

import csx from './Layout.scss';

namespace Layout {
  export interface Props {
    className?: string;
    children: ReactNode;
    overgrown?: boolean;
  }
}

const Layout = ({ className, children, overgrown = false }: Layout.Props) => {
  return (
    <div className={`${csx.layout} ${className} ${overgrown ? csx.overgrown : ''}`}>{children}</div>
  );
};

export default Layout;
