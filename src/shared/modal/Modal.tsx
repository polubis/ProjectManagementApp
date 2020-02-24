import React, { useEffect, useState } from 'react';

import { ModalProps } from './models';

import classes from './Modal.scss';

import { useEscapeAction } from './useEscapeAction';
import Portal from './Portal';

const cssTransitionTime = 300;

const overlayClosed = [classes.overlay, classes.overlayClosed].join(' ');
const overlayWillOpen = [classes.overlay, classes.overlayWillOpen].join(' ');

const modalClosed = [classes.modalContainer, classes.overlayClosed].join(' ');
const modalWillOpen = [classes.modalContainer, classes.overlayWillOpen].join(' ');

const Modal = ({ handleClose, children, open, size }: ModalProps) => {
  const [overlayClasses, setOverlayClasses] = useState(overlayClosed);
  const [modalClasses, setModalClasses] = useState(modalClosed);

  const closeModal = () => {
    setOverlayClasses(overlayClosed);
    setModalClasses(modalClosed);
    setTimeout(() => handleClose(), cssTransitionTime);
  };

  useEscapeAction({ open: open, callback: closeModal, key: 'Escape' });

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOverlayClasses(overlayWillOpen);
        setModalClasses(modalWillOpen);
      }, 10);
    } else {
      setOverlayClasses(overlayClosed);
      setModalClasses(modalClosed);
    }
  }, [open]);

  if (!open) return null;

  const contentClasses = [classes.modalContent, classes[size]].join(' ');

  return (
    <Portal id="modal">
      <div className={classes.wrapper}>
        <div className={overlayClasses}></div>
        <div className={modalClasses}>
          <div className={classes.modalHeader}>
            <button onClick={closeModal} className={classes.buttonClose}>
              X
            </button>
          </div>
          <div className={contentClasses}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
