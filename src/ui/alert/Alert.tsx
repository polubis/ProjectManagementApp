import React, { useCallback, useState, memo } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import { Button } from '..';

import csx from './Alert.scss';

namespace Alert {
  export type Types = 'warning' | 'error' | 'success' | 'info';

  export interface Props {
    message: string;
    type?: Types;
    onClose(): void;
  }
}

const Alert = memo(
  ({ message, type = 'error', onClose }: Alert.Props) => {
    const [open, setOpen] = useState(true);

    const handleClose = useCallback(() => {
      setOpen(false);
      onClose();
    }, []);

    return (
      <Snackbar
        open={open}
        message={message}
        ContentProps={{ classes: { root: `${csx.alert} ${csx[type]}` } }}
        action={
          <Button
            className={csx.closeBtn}
            variant="icon"
            theme="primaryTransparent"
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        }
      />
    );
  },
  () => true
);

export default Alert;
