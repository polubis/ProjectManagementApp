import React from 'react';

import csx from './TechnologyChip.scss';

namespace TechnologyChip {
  export interface Props {
    name: string;
    avatar: string;
  }
}

const TechnologyChip = ({ name, avatar }: TechnologyChip.Props) => {
  return (
    <div className={csx.technologyChip}>
      <figure>
        <img src={avatar} />
      </figure>
      <span>{name}</span>
    </div>
  );
};

export default TechnologyChip;
