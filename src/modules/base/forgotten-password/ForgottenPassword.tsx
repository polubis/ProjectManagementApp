import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'ui';

import { EmailSent } from 'shared/components';

import ForgottenPasswordForm from './forgotten-password-form';
import { useForgottenPassword } from './useForgottenPassword';

import csx from './ForgottenPassword.scss';

const ForgottenPassword = () => {
  const [{ pending, sent }, handleRegister] = useForgottenPassword();

  return (
    <div className={sent ? csx.sent : csx.forgottenPassword}>
      {sent ? (
        <EmailSent label="Email sent" description="Check your email and follow instructions">
          <NavLink to="/login">
            <Button>OK</Button>
          </NavLink>
        </EmailSent>
      ) : (
        <>
          <h5>Password recovery</h5>
          <ForgottenPasswordForm disabled={pending} onSubmit={handleRegister} />
        </>
      )}
    </div>
  );
};

export default ForgottenPassword;
