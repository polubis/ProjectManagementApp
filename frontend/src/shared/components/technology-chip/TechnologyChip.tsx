import React from 'react';

import csx from './TechnologyChip.scss';

namespace TechnologyChip {
  export interface Props {
    name: string;
    avatar: string;
    className?: string;
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }
}

const TechnologyChip = ({ name, avatar, className = '', onClick }: TechnologyChip.Props) => {
  return (
    <div className={`${csx.technologyChip} ${className}`} onClick={onClick}>
      <figure>
        <img src={avatar} />
      </figure>
      <span>{name}</span>
    </div>
  );
};

export default TechnologyChip;
