import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { StepHeader, Button } from 'shared/ui';

import { ConfirmAccountImage } from '.';

import csx from './ConfirmAccount.scss';

export const ConfirmAccount = memo(() => {
  return (
    <div className={csx.confirmAccount}>
      <StepHeader
        description="We have sent you an email with an activation link."
        label="Confirm your account"
      />

      <ConfirmAccountImage />

      <footer>
        <NavLink to="/login">
          <Button>LOG IN</Button>
        </NavLink>

        <Button theme="primaryTransparent">I didn't receive an email. Send it again</Button>
      </footer>
    </div>
  );
});
