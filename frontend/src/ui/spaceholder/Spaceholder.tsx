import React, { memo } from 'react';

import csx from './Spaceholder.scss';

namespace Spaceholder {
  export interface Props {
    className?: string;
    theme?: 'primary';
  }
}

const Spaceholder = memo(
  ({ className, theme = 'primary' }: Spaceholder.Props) => (
    <div className={`${csx.spaceholder} ${className} ${csx[theme]}`} />
  ),
  () => true
);

export default Spaceholder;
