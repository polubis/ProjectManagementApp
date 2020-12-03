import React from 'react';
import { Helmet } from 'react-helmet';

import { useTechnologiesProvider } from 'shared/providers/technologies';

import RegisterForm from './register-form';

import csx from './Register.scss';

const Register = () => {
  const { loading: loadingTechnologies } = useTechnologiesProvider();

  return (
    <>
      <Helmet>
        <title>Register | Jupi.io</title>
        <meta
          name="description"
          content="Sign up for Jupi.io and accelerate your developement process! Create an account to start using and sharing templates with developers from all around the world!"
        />
      </Helmet>
      <div className={csx.register}>{loadingTechnologies || <RegisterForm />}</div>
    </>
  );
};

export default Register;
