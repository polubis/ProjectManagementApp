import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Field, Checkbox } from 'ui';

import { useForm, FormSubmitEvent } from 'shared/forms';

import { loginFormConfig, LoginFormProps } from '.';

import csx from './LoginForm.scss';

export const LoginForm = ({ disabled, onSubmit }: LoginFormProps) => {
  const [{ fields, dirty, invalid }, change, directChange, submit] = useForm(loginFormConfig);

  const handleSubmit = (e: FormSubmitEvent) => {
    const invalid = submit(e);

    if (invalid) {
      return;
    }

    const [{ value: login }, { value: password }] = fields;

    onSubmit({ login, password });
  };

  return (
    <form className={csx.loginForm} onSubmit={handleSubmit}>
      {loginFormConfig.map(({ label, type }, idx) => (
        <Field
          key={label}
          data-idx={idx}
          label={label}
          placeholder={`${label}...`}
          type={type}
          error={dirty ? fields[idx].error : ''}
          value={fields[idx].value}
          onChange={change}
        />
      ))}

      <div className={csx.loginActions}>
        <Checkbox label="Remember me" />
        {disabled || <NavLink to="/forgot-password">Forgot password ?</NavLink>}
      </div>

      <Button type="submit" disabled={disabled || (dirty && invalid)}>
        SUBMIT
      </Button>
    </form>
  );
};
