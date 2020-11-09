import React, { memo } from 'react';

import csx from './Loader.scss';

const SIZES = {
  small: {
    width: '24px',
    height: '24px'
  },

  medium: {
    height: '40px',
    width: '40px'
  }
};

namespace Loader {
  export interface Props {
    className?: string;
    size?: keyof typeof SIZES;
  }
}

const Loader = memo(
  ({ className = '', size = 'medium' }: Loader.Props) => (
    <div className={`${csx.loader} ${className}`} style={SIZES[size]} />
  ),
  () => true
);

export default Loader;
