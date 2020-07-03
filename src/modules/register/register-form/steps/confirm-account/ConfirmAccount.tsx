import React from 'react';
import { NavLink } from 'react-router-dom';

import { StepHeader, Button } from 'ui';

import { ConfirmAccountImage } from '.';

import csx from './ConfirmAccount.scss';

const ConfirmAccount = () => {
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
};

export default ConfirmAccount;
