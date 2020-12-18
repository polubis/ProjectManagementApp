import React, { memo, useEffect, useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import { Button } from '..';

import csx from './Alert.scss';

namespace Alert {
  export type Type = 'error' | 'success';

  export interface Props {
    id: number;
    className?: string;
    delay?: number;
    message: string;
    type?: Type;
    onClose(): void;
  }
}

const Alert = memo(
  ({ className = '', delay = 5000, id, message, type = 'error', onClose }: Alert.Props) => {
    const [animationClass, setAnimationClass] = useState(csx.animateIn);

    useEffect(() => {
      if (!delay) {
        return;
      }

      let nestedTimeout;

      const parentTimeout = setTimeout(() => {
        setAnimationClass(csx.animateOut);
        nestedTimeout = setTimeout(onClose, 300);
      }, delay);

      return () => {
        if (parentTimeout) {
          clearTimeout(parentTimeout);
        }

        if (nestedTimeout) {
          clearTimeout(nestedTimeout);
        }
      };
    }, []);

    return (
      <div className={`${csx.alert} ${className} ${animationClass} ${csx[type]}`}>
        <span className={csx.id}>{id}</span>

        <div className={csx.divider} />

        <span className={csx.message}>{message}</span>

        <Button
          className={csx.closeBtn}
          variant="icon"
          theme="primaryTransparent"
          onClick={onClose}
        >
          <CloseIcon />
        </Button>
      </div>
    );
  },
  () => true
);

export default Alert;
