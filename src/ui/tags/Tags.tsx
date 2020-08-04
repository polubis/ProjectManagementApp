import React from 'react';

import { Tag } from '..';

import csx from './Tags.scss';

namespace Tags {
  export interface Props {
    items: string[];
    className?: string;
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }
}

const Tags = ({ items, className = '', onClick }: Tags.Props) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`${csx.tags} ${className}`}>
      {items.map((item, idx) => (
        <Tag key={idx} label={item} dataIdx={idx} onClick={onClick} />
      ))}
    </div>
  );
};

export default Tags;
