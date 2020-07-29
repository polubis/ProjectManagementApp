import React from 'react';

import csx from './Technology.scss';

namespace Technology {
  export interface Props {
    name: string;
    avatar: string;
    onClick?(): void;
  }
}

const Technology = ({ name, avatar, onClick }: Technology.Props) => (
  <div className={csx.technology} onClick={onClick}>
    <figure>
      <img src={avatar} />
    </figure>

    <span>{name}</span>
  </div>
);

export default Technology;
