import React, { FC } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';

import { Button, Backdrop } from 'ui';

import { usePortal } from 'utils';

import MobileNavigationProvider, { useMobileNavigationProvider } from './MobileNavigationProvider';

import csx from './MobileNavigation.scss';

namespace MobileNavigation {
  export interface Props {
    className?: string;
    children: React.ReactNode;
    viewport?: 'mobile' | 'tablet';
  }
}

const MobileNavigation: FC<MobileNavigation.Props> = ({
  className = '',
  children,
  viewport = 'mobile',
}) => {
  const { open, toggleOpen } = useMobileNavigationProvider();

  const render = usePortal();

  return (
    <>
      {open && <Backdrop className={`${csx.backdrop} ${csx[viewport]}`} onClick={toggleOpen} />}

      {render(
        <>
          <Button
            className={`${open ? csx.open : ''} ${csx.trigger} ${csx[viewport]}`}
            variant="icon"
            onClick={toggleOpen}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </Button>

          {open && <div className={`${csx.elevation} ${csx[viewport]}`} onClick={toggleOpen} />}
        </>
      )}

      {open && <div className={`${csx.menu} ${csx[viewport]} ${className}`}>{children}</div>}
    </>
  );
};

const ConnectedMobileNavigation: FC<MobileNavigation.Props> = (props) => (
  <MobileNavigationProvider>
    <MobileNavigation {...props} />
  </MobileNavigationProvider>
);

export default ConnectedMobileNavigation;
