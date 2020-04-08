import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Field, Checkbox } from 'shared/ui';
import { useForm, FormSubmitEvent } from 'shared/forms';

import { logInViaCredentials } from 'api';

import { loginFormConfig } from '.';

import csx from './LoginForm.scss';

export const LoginForm = () => {
  const [isLogingIn, setIsLogingIn] = useState(false);

  const [{ fields, isDirty, isInvalid }, change, submit] = useForm(loginFormConfig);

  const handleLogin = async (e: FormSubmitEvent) => {
    const isInvalid = submit(e);

    if (isInvalid) {
      return;
    }

    setIsLogingIn(true);

    const [{ value: login }, { value: password }] = fields;

    try {
      await logInViaCredentials({ login, password });
    } catch (error) {
    } finally {
      setIsLogingIn(false);
    }
  };

  return (
    <form className={csx.loginForm} onSubmit={handleLogin}>
      {loginFormConfig.map(({ label, type }, idx) => (
        <Field
          key={label}
          data-idx={idx}
          label={label}
          placeholder={`${label}...`}
          type={type}
          error={isDirty && fields[idx].error}
          onChange={change}
        />
      ))}

      <div className={csx.loginActions}>
        <Checkbox label="Remember me" />
        <NavLink to="/forgot-password">Forgot password ?</NavLink>
      </div>

      <Button type="submit" disabled={isLogingIn || (isDirty && isInvalid)}>
        SUBMIT
      </Button>
    </form>
  );
};
