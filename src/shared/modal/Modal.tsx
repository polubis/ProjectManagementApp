import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { ModalProps } from './models';

import classes from './Modal.scss';
import { Portal } from './Portal';

const Modal = ({ handleClose, children, open, size, title }: ModalProps) => {
  const [overlayClasses, setOverlayClasses] = useState(
    [classes.overlay, classes.overlayClosed].join(' ')
  );

  useEffect(() => {
    if (open) {
      setTimeout(
        () =>
          setOverlayClasses(
            [classes.overlay, classes.overlayWillOpen].join(' ')
          ),
        50
      );
    } else {
      setOverlayClasses([classes.overlay, classes.overlayClosed].join(' '));
    }
  }, [open]);

  const closeModal = () => {
    setOverlayClasses([classes.overlay, classes.overlayClosed].join(' '));
    setTimeout(() => handleClose(), 300);
  };

  if (!open) return null;

  const contentClasses = [classes.modalContent, classes[size]].join(' ');

  return (
    <Portal id="modal">
      <div className={overlayClasses}>
        <div className={classes.modalContainer}>
          <div className={classes.modalHeader}>
            <h1 className={classes.modalHeaderTitle}>{title}</h1>
            <button onClick={closeModal}>X</button>
          </div>
          <div className={contentClasses}>{children}</div>

          <div className={classes.modalActions}>
            <button onClick={closeModal}>close</button>
            <button onClick={() => console.log('action')}>additional action</button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
