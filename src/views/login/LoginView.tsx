import React from 'react';

import { Button } from 'ui';

import { signInViaGithub } from 'api';

import { LoginForm } from '.';

import { IMGS } from 'consts';

import { Auth } from 'core/auth';

import csx from './LoginView.scss';

const LoginView = () => {
  const { logIn, pending } = Auth.useProvider();

  return (
    <div className={csx.loginView}>
      <h5>Log In</h5>

      <LoginForm disabled={pending} onSubmit={logIn} />

      <div className={csx.divider}>
        <div />
        <span>Or Log In using</span>
        <div />
      </div>

      <Button variant="icon" disabled={pending} onClick={signInViaGithub}>
        <img src={IMGS + '/GithubLogo.png'} />
      </Button>
    </div>
  );
};

export default LoginView;
