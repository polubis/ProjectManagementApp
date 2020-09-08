import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from "ui";

import ForgotPasswordForm from './forgot-password-form';

import { useForgotPassword } from './useForgotPassword';

import {EmailSent, Footer, Navbar} from 'shared/components';

import csx from './ForgotPassword.scss';

const ForgotPassword = () => {
  const [{ pending, sent }, handleRegister] = useForgotPassword();

  return (
    <>
      <Navbar/>
      <div className={sent ? csx.sent : csx.forgotPassword}>
        {!sent
          ? <>
            <h5>Password recovery</h5>
            <ForgotPasswordForm disabled={pending} onSubmit={handleRegister}/>
          </>
          : <EmailSent
            label="Email sent"
            description="Check your email and follow instructions"
          >
            <NavLink to="/login">
              <Button>OK</Button>
            </NavLink>
          </EmailSent>
        }
      </div>
      <Footer/>
    </>
  );
};

export default ForgotPassword;
