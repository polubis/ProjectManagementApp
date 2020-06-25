import React, { memo } from 'react';

import csx from './Placeholder.scss';

export const Placeholder = memo(
  () => {
    return <div className={csx.placeholder} />;
  },
  () => true
);
