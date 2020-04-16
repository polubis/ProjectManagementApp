import React, { useState } from 'react';

import { Button } from 'shared/ui';

import { signInViaGithub, logInViaCredentials } from 'api';

import { LoginForm } from '.';

import { IMGS } from 'consts';

import csx from './LoginView.scss';

const LoginView = () => {
  const [isLogingIn, setIsLogingIn] = useState(false);

  const handleLogin = async (login: string, password: string) => {
    setIsLogingIn(true);

    try {
      await logInViaCredentials({ login, password });
    } catch (error) {
    } finally {
      setIsLogingIn(false);
    }
  };

  return (
    <div className={csx.loginView}>
      <h5>Log In</h5>

      <LoginForm isDisabled={isLogingIn} onSubmit={handleLogin} />

      <div className={csx.divider}>
        <div />
        <span>Or Log In using</span>
        <div />
      </div>

      <Button variant="icon" disabled={isLogingIn} onClick={signInViaGithub}>
        <img src={IMGS + '/GithubLogo.png'} />
      </Button>
    </div>
  );
};

export default LoginView;
