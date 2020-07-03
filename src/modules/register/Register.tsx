import React from 'react';

import { useTechnologiesProvider } from 'core/technologies';

import RegisterForm from './register-form';

import csx from './Register.scss';

const Register = () => {
  const { loading: loadingTechnologies } = useTechnologiesProvider();

  return <div className={csx.register}>{!loadingTechnologies && <RegisterForm />}</div>;
};

export default Register;
