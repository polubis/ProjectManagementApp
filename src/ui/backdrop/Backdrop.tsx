import React, { memo } from 'react';

import { usePortal } from 'utils';

import csx from './Backdrop.scss';

namespace Backdrop {
  export interface Props {
    className?: string;
    onClick(): void;
  }
}

const Backdrop = memo(
  ({ className = '', onClick }: Backdrop.Props): JSX.Element => {
    const render = usePortal();

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      onClick();
    };

    return render(<div className={`${className} ${csx.backdrop}`} onClick={handleClick} />);
  },
  () => true
);

export default Backdrop;
