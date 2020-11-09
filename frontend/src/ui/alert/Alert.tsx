import React, { useCallback, memo } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import { usePortal } from 'utils';

import csx from './Alert.scss';

namespace Alert {
  export namespace Events {
    export type Close = React.MouseEvent<SVGSVGElement, MouseEvent>;
  }

  export type Types = 'warning' | 'error' | 'success' | 'info';

  export type OnClose = (idx: number) => void;

  export interface Props {
    idx: number;
    message: string;
    type?: Types;
    onClose: OnClose;
  }
}

const Alert = memo(
  ({ idx, message, type = 'error', onClose }: Alert.Props) => {
    const render = usePortal();

    const handleClose = useCallback((e: Alert.Events.Close) => {
      onClose(+e.currentTarget.getAttribute('data-idx'));
    }, []);

    return render(
      <div className={`${csx.alert} ${csx[type]}`}>
        <span>{message}</span>
        <CloseIcon data-idx={idx} onClick={handleClose} />
      </div>
    );
  },
  () => true
);

export default Alert;
