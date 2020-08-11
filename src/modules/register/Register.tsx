import React from 'react';

import { useTechnologiesProvider } from 'core/technologies';

import RegisterForm from './register-form';

import { Footer, Navbar } from 'shared/components';

import csx from './Register.scss';

const Register = () => {
  const { loading: loadingTechnologies } = useTechnologiesProvider();

  return (
    <>
      <Navbar/>
      <div className={csx.register}>{!loadingTechnologies && <RegisterForm/>}</div>
      <Footer/>
    </>
  )
};

export default Register;
