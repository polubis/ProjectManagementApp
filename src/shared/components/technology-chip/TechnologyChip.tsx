import React from 'react';

import { Img } from 'ui';

import csx from './TechnologyChip.scss';

namespace TechnologyChip {
  export interface Props {
    className?: string;
    name: string;
    url?: string;
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }
}

const TechnologyChip = ({ className = '', name, url, onClick }: TechnologyChip.Props) => {
  return (
    <div className={`${csx.technologyChip} ${className}`} onClick={onClick}>
      <Img alt="Technology image" size="32px:32px" src={url} />
      <span>{name}</span>
    </div>
  );
};

export default TechnologyChip;
