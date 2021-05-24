import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Form from 'io-form';

import { Button, InputField } from 'ui';

import { Credentials } from 'shared/models';

import csx from './LoginForm.scss';
import { useForm } from 'shared/io/react-form';
import { minLength } from 'shared/io/validation';
import { maxLength } from 'shared/validation';

namespace LoginForm {
  export interface Props {
    onSubmit(credentials: Credentials): void;
  }
}

const VALIDATORS = [minLength(3), maxLength(50)];

const LoginForm = ({ onSubmit }: LoginForm.Props): JSX.Element => {
  const [{ dirty, errors, invalid, values }, { set, submit }] = useForm<Credentials>(
    {
      login: '',
      password: '',
    },
    {
      login: VALIDATORS,
      password: VALIDATORS,
    }
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.getAttribute('data-key') as keyof Credentials;

    set({ [key]: e.target.value });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      submit(e);
    },
    [values]
  );

  return (
    <form className={csx.loginForm} onSubmit={handleSubmit}>
      <InputField
        data-key="username"
        label="Username"
        placeholder="Username..."
        error={dirty ? (errors.username ? 'Invalid username format' : '') : ''}
        value={values.username}
        onChange={handleChange}
      />

      <InputField
        data-key="password"
        type="password"
        label="Password"
        placeholder="Password..."
        error={dirty ? (errors.password ? 'Invalid password format' : '') : ''}
        value={values.password}
        onChange={handleChange}
      />

      <div className={csx.loginActions}>
        <NavLink to="/forgotten-password">Forgot password ?</NavLink>
      </div>

      <Button type="submit" disabled={dirty && invalid}>
        SUBMIT
      </Button>
    </form>
  );
};

export default LoginForm;
