import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, InputField, Checkbox } from 'ui';

import { LogInPayload } from 'core/api';

import { Form } from 'src/utils/forms';

import csx from './LoginForm.scss';

namespace LoginForm {
  export interface Props {
    onSubmit(credentials: LogInPayload): void;
  }
}

const LoginForm = ({ onSubmit }: LoginForm.Props) => {
  const [{ data, dirty, invalid, set, submit, result }, setForm] = useState(
    new Form<LogInPayload>(
      {
        login: '',
        password: ''
      },
      {
        password: [v => v.length < 4 || v.length > 20]
      }
    )
  );

  const handleLoginChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setForm(set({ login: e.target.value }));
    },
    [data]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setForm(set({ password: e.target.value }));
    },
    [data]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const submittedForm = submit();
      setForm(submittedForm);

      if (submittedForm.invalid) {
        return;
      }

      onSubmit(submittedForm.data);
    },
    [data, onSubmit]
  );

  return (
    <form className={csx.loginForm} onSubmit={handleSubmit}>
      <InputField
        label="Login"
        placeholder="Login..."
        error={dirty && result.login ? 'Invalid login' : ''}
        value={data.login}
        onChange={handleLoginChange}
      />

      <InputField
        type="password"
        label="Password"
        placeholder="Password..."
        error={dirty && result.password ? 'Invalid password' : ''}
        value={data.password}
        onChange={handlePasswordChange}
      />

      <div className={csx.loginActions}>
        {/* TODO: Replace later with correct value and on Change handler */}
        <Checkbox label="Remember me" value={false} onChange={() => {}} />
        <NavLink to="/forgotten-password">Forgot password ?</NavLink>
      </div>

      <Button type="submit" disabled={dirty && invalid}>
        SUBMIT
      </Button>
    </form>
  );
};

export default LoginForm;
