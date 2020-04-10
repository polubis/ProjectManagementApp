import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Field, Checkbox } from 'shared/ui';
import { useForm, FormSubmitEvent } from 'shared/forms';

import { loginFormConfig } from '.';

import csx from './LoginForm.scss';

interface LoginFormProps {
  isDisabled: boolean;
  onSubmit(login: string, password: string): void;
}

export const LoginForm = ({ isDisabled, onSubmit }: LoginFormProps) => {
  const [{ fields, isDirty, isInvalid }, change, submit] = useForm(loginFormConfig);

  const handleSubmit = (e: FormSubmitEvent) => {
    const isInvalid = submit(e);

    if (isInvalid) {
      return;
    }

    const [{ value: login }, { value: password }] = fields;

    onSubmit(login, password);
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
          error={isDirty && fields[idx].error}
          onChange={change}
        />
      ))}

      <div className={csx.loginActions}>
        <Checkbox label="Remember me" />
        {isDisabled || <NavLink to="/forgot-password">Forgot password ?</NavLink>}
      </div>

      <Button type="submit" disabled={isDisabled || (isDirty && isInvalid)}>
        SUBMIT
      </Button>
    </form>
  );
};
