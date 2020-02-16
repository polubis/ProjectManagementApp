import React, {
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

import { ModalProps } from './models';

import classes from './Modal.scss';
import { Portal } from './usePortal';

const Modal = ({ handleClose, children, open, size }: ModalProps) => {
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
        300
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
          <div className={contentClasses}>
            {children}
            <div className={classes.modalActions}>
              <button onClick={closeModal}>close</button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
