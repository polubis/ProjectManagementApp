import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

import { usePortal } from 'shared/utils';

import { AlertProps } from '.';

import csx from './Alert.scss';

export const Alert = ({ message, type = 'error', onClose }: AlertProps) => {
  const render = usePortal();

  const className = [csx.alert, csx[type]].join(' ');

  return render(
    <div className={className}>
      <span>{message}</span>
      <CloseIcon onClick={onClose} />
    </div>
  );
};
