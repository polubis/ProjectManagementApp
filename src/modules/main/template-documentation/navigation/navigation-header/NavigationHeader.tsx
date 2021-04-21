import React, { FC, memo } from 'react';

import csx from './NavigationHeader.scss';

const NavigationHeader: FC = memo(
  () => (
    <header className={csx.navigationHeader}>
      <h3>Documentation</h3>
      <span>Use menu to navigate through</span>
    </header>
  ),
  () => true
);

export default NavigationHeader;
