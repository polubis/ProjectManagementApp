import React from 'react';

import { usePortal } from 'utils';

import csx from './Backdrop.scss';

namespace Backdrop {
  export interface Props {
    className?: string;
    outside?: boolean;
    onClick?(): void;
  }
}

const Backdrop = ({
  className = '',
  outside = true,
  onClick = () => {},
}: Backdrop.Props): JSX.Element => {
  const render = usePortal();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };

  const element = <div className={`${className} ${csx.backdrop}`} onClick={handleClick} />;

  return outside ? render(element) : element;
};

export default Backdrop;
