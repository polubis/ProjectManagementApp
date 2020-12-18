import React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from 'ui';

import { IMGS_PATH } from 'consts';

import { useAuthProvider } from 'shared/providers/auth';

import LoginForm from './login-form';

import csx from './Login.scss';

const Login = (): JSX.Element => {
  const { logIn, logInViaGithub } = useAuthProvider();

  return (
    <>
      <Helmet>
        <title>Log in | Jupi.io</title>
        <meta
          name="description"
          content="Sign in for Jupi.io and accelerate your developement process straightaway! Have an account already? Log in and jump into the world of ready to use templates and solutions for your project!"
        />
      </Helmet>
      <div className={csx.login}>
        <h5>Log In</h5>

        <LoginForm onSubmit={logIn} />

        <div className={csx.divider}>
          <div />
          <span>Or Log In using</span>
          <div />
        </div>

        <Button variant="icon" onClick={logInViaGithub}>
          <img src={`${IMGS_PATH}/GithubLogo.png`} alt="GitHub Logo" />
        </Button>
      </div>
    </>
  );
};

export default Login;
