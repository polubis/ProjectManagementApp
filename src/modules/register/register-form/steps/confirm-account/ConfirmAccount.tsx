import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'ui';

import { EmailSent } from 'shared/components';

const ConfirmAccount = () => (
  <EmailSent
    label="Confirm your account"
    description="We have sent you an email with an activation link"
  >
    <NavLink to="/login">
      <Button>LOG IN</Button>
    </NavLink>

    <Button theme="primaryTransparent">I didn't receive an email. Send it again</Button>
  </EmailSent>
);

export default ConfirmAccount;
