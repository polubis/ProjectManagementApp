import React, { FC, memo } from 'react';

import { ErrorAction, Button } from 'ui';

import csx from './ExceptionScreen.scss';
import ExceptionImage from './ExceptionImage';

const ExceptionScreen: FC = memo(
  () => {
    const handleReload = () => {
      window.location.reload(true);
    };

    return (
      <div className={csx.exceptionScreen}>
        <ErrorAction
          className={csx.action}
          description="
      An unexpected error has occurred. Don't worry, we've noticed the problem and are already fixing it"
          operations={
            <>
              <ExceptionImage className={csx.image} />
              <Button onClick={handleReload}>RELOAD APP</Button>
            </>
          }
          title="Unknown error occured"
        />
      </div>
    );
  },
  () => true
);

export default ExceptionScreen;
