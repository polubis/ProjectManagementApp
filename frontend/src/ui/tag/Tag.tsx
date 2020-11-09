import React from 'react';

import csx from './Tag.scss';

namespace Tag {
  export namespace Events {
    export type Click = React.MouseEvent<HTMLDivElement, MouseEvent>;
  }

  export interface Props {
    dataIdx: string | number;
    label: string;
    className?: string;
    onClick?(e: Tag.Events.Click): void;
  }
}

const Tag = ({ label, dataIdx, className = '', onClick }: Tag.Props) => (
  <div className={`${csx.tag} ${className}`} data-idx={dataIdx} onClick={onClick}>
    {label}
  </div>
);

export default Tag;
