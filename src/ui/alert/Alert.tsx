import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

import { usePortal } from 'utils';

import csx from './Alert.scss';

namespace Alert {
  export type Types = 'warning' | 'error' | 'success' | 'info';

  export interface Props {
    message: string;
    type?: Types;
    onClose(): void;
  }
}

const Alert = ({ message, type = 'error', onClose }: Alert.Props) => {
  const render = usePortal();

  return render(
    <div className={`${csx.alert} ${csx[type]}`}>
      <span>{message}</span>
      <CloseIcon onClick={onClose} />
    </div>
  );
};

export default Alert;
