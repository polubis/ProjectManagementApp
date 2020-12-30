import React from 'react';

import csx from './Layout.scss';

namespace Layout {
  export interface Props {
    children: [React.ReactElement, React.ReactElement];
  }
}

const Layout = ({ children: [Navigation, Content] }: Layout.Props): JSX.Element => (
  <div className={csx.layout}>
    <aside>{Navigation}</aside>
    <section>
      <div className={csx.content}>{Content}</div>
    </section>
  </div>
);

export default Layout;
