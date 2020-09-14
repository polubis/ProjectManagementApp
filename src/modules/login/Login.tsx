import React from 'react';

import { Button } from 'ui';

import { IMGS_PATH } from 'consts';

import { useAuthProvider } from 'core/auth';

import LoginForm from './login-form';

import { Footer, Navbar } from 'shared/components';

import csx from './Login.scss';

const Login = () => {
  const { logIn, logInViaGithub } = useAuthProvider();

  return (
    <>
      <Navbar />
      <div className={csx.login}>
        <h5>Log In</h5>

        <LoginForm onSubmit={logIn} />

        <div className={csx.divider}>
          <div />
          <span>Or Log In using</span>
          <div />
        </div>

        <Button variant="icon" onClick={logInViaGithub}>
          <img src={IMGS_PATH + '/GithubLogo.png'} />
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default Login;
