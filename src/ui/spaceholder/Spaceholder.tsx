import React, { memo, ReactNode } from 'react';

import csx from './Spaceholder.scss';

namespace Spaceholder {
  export interface Props {
    className?: string;
    theme?: 'primary';
    children?: ReactNode;
  }
}

const Spaceholder = memo(
  ({ className = "", theme = 'primary', children }: Spaceholder.Props) => (
    <div className={`${csx.spaceholder} ${className} ${csx[theme]}`} >
      {children}
    </div>
  ),
  () => true
);

export default Spaceholder;
