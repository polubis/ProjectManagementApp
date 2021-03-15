import React, { FC, ReactNode } from 'react';

import csx from './Action.scss';

namespace Action {
  export interface Props {
    className?: string;
    description: ReactNode;
    operations: ReactNode;
    title: ReactNode;
  }
}

const Action: FC<Action.Props> = ({ className = '', description, operations, title }) => {
  return (
    <div className={`${className} ${csx.action}`}>
      <h3>{title}</h3>
      <span>{description}</span>
      <footer>{operations}</footer>
    </div>
  );
};

export default Action;
