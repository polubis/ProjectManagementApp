import React, { memo } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import { usePortal } from 'utils';

import { Button } from '..';

import csx from './Alert.scss';

namespace Alert {
  export type Type = 'error' | 'success';

  export interface Props {
    id: number;
    message: string;
    type: Type;
    onClose(): void;
  }
}

const Alert = memo(
  ({ id, message, type, onClose }: Alert.Props) => {
    const render = usePortal();

    return render(
      <div className={`${csx.alert} ${csx[type]}`}>
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
