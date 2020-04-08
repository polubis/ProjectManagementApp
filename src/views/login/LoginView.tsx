import React from 'react';

import { Button } from 'shared/ui';

import { signInViaGithub } from 'api';

import { LoginForm } from '.';

import csx from './LoginView.scss';

const LoginView = () => {
  return (
    <div className={csx.loginView}>
      <h5>Log In</h5>

      <LoginForm />

      <div className={csx.divider}>
        <div />
        <span>Or Log In using</span>
        <div />
      </div>

      <Button variant="icon" onClick={signInViaGithub}>
        <img src={window.location.origin + '/public/images/GithubLogo.png'} />
      </Button>
    </div>
  );
};

export default LoginView;
