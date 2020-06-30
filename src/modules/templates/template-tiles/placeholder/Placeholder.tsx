import React, { memo } from 'react';

import csx from './Placeholder.scss';

const Placeholder = memo(
  () => {
    return <div className={csx.placeholder} />;
  },
  () => true
);

export default Placeholder;
