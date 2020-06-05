import React, { useContext } from 'react';

import { Button } from 'shared/ui';

import { signInViaGithub } from 'api';

import { LoginForm } from '.';

import { IMGS } from 'consts';

import { AuthContext } from 'features/auth';

import csx from './LoginView.scss';

const LoginView = () => {
  const { logIn, isPending } = useContext(AuthContext);

  return (
    <div className={csx.loginView}>
      <h5>Log In</h5>

      <LoginForm isDisabled={isPending} onSubmit={logIn} />

      <div className={csx.divider}>
        <div />
        <span>Or Log In using</span>
        <div />
      </div>

      <Button variant="icon" disabled={isPending} onClick={signInViaGithub}>
        <img src={IMGS + '/GithubLogo.png'} />
      </Button>
    </div>
  );
};

export default LoginView;
