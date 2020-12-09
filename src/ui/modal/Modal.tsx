import React, { ReactNode } from 'react';

import { Backdrop } from 'ui';

import { usePortal } from 'utils';

import csx from './Modal.scss';

export namespace Modal {
  export interface Props {
    children: ReactNode;
    className?: string;
    onClose?(): void;
  }
}

const Modal = ({ children, className = '', onClose }: Modal.Props): JSX.Element => {
  const render = usePortal();

  return (
    <>
      {render(
        <div className={csx.modal}>
          <div className={`${csx.content} ${className}`}>{children}</div>
          <Backdrop outside={false} onClick={onClose} />
        </div>
      )}
    </>
  );
};

export default Modal;
