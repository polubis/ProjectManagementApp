import React, { useCallback, memo, useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';

import csx from './Alert.scss';

namespace Alert {
  export type Types = 'warning' | 'error' | 'success' | 'info';

  export interface Props {
    message: string;
    type?: Types;
    onClose: () => void;
  }
}

const Alert = memo(
  ({ message, type = 'error', onClose }: Alert.Props) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      onClose();
    }, []);

    return (
      <Snackbar
        open={isOpen}
        onClose={handleClose}
        message={message}
        classes={{ root: `${csx.root}` }}
        ContentProps={{ classes: { root: `${csx.alert} ${csx[type]}` } }}
      />
    );
  },
  () => true
);

export default Alert;
