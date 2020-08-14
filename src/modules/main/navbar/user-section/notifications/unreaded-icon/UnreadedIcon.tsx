import React from 'react';

import csx from './UnreadedIcon.scss';

namespace UnreadedIcon {
  export interface Props {
    className?: string;
  }
}

const UnreadedIcon = ({ className = '' }: UnreadedIcon.Props) => (
  <div className={`${csx.icon} ${className}`} />
);

export default UnreadedIcon;
