import React, { useCallback, useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';

import { Button, Backdrop } from 'ui';

import { usePortal } from 'utils';

import csx from './MobileNavigation.scss';

namespace MobileNavigation {
  export interface Props {
    children: React.ReactNode;
  }
}

const MobileNavigation = ({ children }: MobileNavigation.Props): JSX.Element => {
  const render = usePortal();

  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <>
      {open && <Backdrop className={csx.backdrop} onClick={toggleOpen} />}

      {render(
        <>
          <Button
            className={`${open ? csx.open : ''} ${csx.trigger}`}
            variant="icon"
            onClick={toggleOpen}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </Button>

          {open && <div className={csx.elevation} onClick={toggleOpen} />}
        </>
      )}

      {open && <div className={csx.menu}>{children}</div>}
    </>
  );
};

export default MobileNavigation;
