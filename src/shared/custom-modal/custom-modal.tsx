import React from 'react';

import classes from './custom-modal.scss';
const CustomModal = () => {
  return (
    <>
      <div className={classes.overlay}></div>
      <div className={classes.modal}>
        <header>
          <span>Tytul</span>
          <b>X</b>
        </header>

        <ul>
          {Array.from({ length: 300 }, (_, idx) => idx).map((_, idx) => (
            <li key={idx}>{idx}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CustomModal;


// const Modal = ({ }) => {
//   //
// };  

// const StrechModal = ({ }: ModaProps) => {

// };

// const ScrolledInnerMOdal = ({ children }: ModalPRops) => {
//   return <Modal variant></Modal>

// };

// 1. usePortal - wrzuca to co przekazesz obok roota
// 2. <Modal> - podstawowe podstawowe features, listening escape, klikane zamykanie
// 3. <StrechedModal> - wykorzystuje modal + dodatkowe opcje + pozbywa sie niepotrzebnego interfejsu
// 4 <ScrolledInnerMOdal> - wykorzystue modal + dodatkowe opcje + {pzybwa sie niepotrzebnego intefejsu}


/**
 *     const { renderPortal } = usePortal();

    return open
      ? renderPortal(
          <div
            onClick={onClose}
            className={[
              classes.alert,
              classes[`alert-${mode}`],
              classes[`alert-animated-${animationClass}`]
            ].join(' ')}
          >
            {message}
          </div>
        )
      : null;
  }
 * 
 * 
 * 
 */

/**
 * 
 * import { useEffect, useMemo, ReactPortal, ReactNode } from 'react';
import ReactDOM from 'react-dom';

const rootPortalDiv = document.getElementById('root-portal')!;

type UsePortalReturn = { renderPortal: (children: ReactNode) => ReactPortal | null };

export const usePortal = (): UsePortalReturn => {
  const el = useMemo(() => {
    return document.createElement('div');
  }, []);

  console.log('siema');

  useEffect(() => {
    rootPortalDiv.appendChild(el);

    return () => {
      rootPortalDiv.removeChild(el);
    };
  }, []);

  return { renderPortal: children => ReactDOM.createPortal(children, el) };
};

 */