import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Field, Checkbox } from 'shared/ui';
import { useForm } from 'shared/forms';

import { loginFormConfig } from '.';

import csx from './LoginForm.scss';

export const LoginForm = () => {
  const [{ fields }, change, submit] = useForm(loginFormConfig);

  return (
    <form className={csx.loginForm}>
      {loginFormConfig.map(({ label, type }, idx) => (
        <Field
          key={label}
          data-idx={idx}
          label={label}
          placeholder={`${label}...`}
          type={type}
          onChange={change}
          isInvalid={!!fields[idx].error}
        />
      ))}

      <div className={csx.loginActions}>
        <Checkbox label="Remember me" />
        <NavLink to="/forgot-password">Forgot password ?</NavLink>
      </div>

      <Button>LOG IN</Button>
    </form>
  );
};
