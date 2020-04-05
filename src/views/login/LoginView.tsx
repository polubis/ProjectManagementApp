import React from 'react';

import { LoginForm } from '.';

import csx from './LoginView.scss';

const LoginView = () => {
  return (
    <div className={csx.loginView}>
      <h5>Sign In</h5>
      <LoginForm />
    </div>
  );
};

export default LoginView;
