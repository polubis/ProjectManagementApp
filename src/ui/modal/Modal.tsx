import React, { ReactNode } from 'react';

import { usePortal } from 'utils';

import csx from './Modal.scss';

export namespace Modal {
  export interface Props {
    children: ReactNode;
    className?: string;
  }
}

const Modal = ({ children, className = '' }: Modal.Props) => {
  const render = usePortal();

  return render(
    <div className={csx.modal}>
      <div className={`${csx.content} ${className}`}>{children}</div>
    </div>,
  );
};

export default Modal;
