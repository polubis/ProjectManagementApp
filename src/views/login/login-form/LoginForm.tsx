import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Field, Checkbox } from 'shared/ui';

import csx from './LoginForm.scss';

export const LoginForm = () => {
  return (
    <form className={csx.loginForm}>
      <Field label="Email *" />
      <Field label="Password *" type="password" />

      <div className={csx.loginActions}>
        <Checkbox label="Remember me" />
        <NavLink to="/forgot-password">Forgot password ?</NavLink>
      </div>

      <Button>LOG IN</Button>
    </form>
  );
};
