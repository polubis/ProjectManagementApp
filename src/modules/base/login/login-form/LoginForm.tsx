import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Form from 'io-form';

import { Button, InputField } from 'ui';

import { LogInPayload } from 'shared/models';

import csx from './LoginForm.scss';

namespace LoginForm {
  export interface Props {
    onSubmit(credentials: LogInPayload): void;
  }
}

const LoginForm = ({ onSubmit }: LoginForm.Props) => {
  const [{ errors, dirty, invalid, next, submit, values }, setForm] = useState(
    Form<LogInPayload>(
      {
        password: '',
        username: '',
      },
      {
        password: [(v) => v.length < 3 || v.length > 50],
        username: [(v) => v.length < 3 || v.length > 50],
      }
    )
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.getAttribute('data-key') as keyof LogInPayload;

    setForm(
      next({
        [key]: e.target.value,
      })
    );
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const checkedForm = submit(e);

      if (checkedForm.invalid) {
        setForm(checkedForm);
        return;
      }

      onSubmit(values);
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
