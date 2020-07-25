import React from 'react';

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
    <div className={`${csx.tags} ${className} ${onClick ? csx.clickable : ''}`}>
      {items.map((tag, idx) => (
        <div key={tag} data-idx={idx} onClick={onClick}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Tags;
