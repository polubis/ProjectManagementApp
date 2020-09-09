import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, InputField, Checkbox } from 'ui';

import { Form } from 'utils';

import { LogInPayload } from 'core/api';

import { Field, FormBuilder } from 'src/modules/form-builder';

import csx from './LoginForm.scss';

namespace LoginForm {
  export interface Props {
    disabled: boolean;
    onSubmit(credentials: LogInPayload): void;
  }
}

const req = (value: string) => !value;
const min = (ln: number) => (value: string) => value.length < ln;
const max = (ln: number) => (value: string) => value.length > ln;

const config = {
  login: new Field('', [req, min(2), max(50)]),
  password: new Field('', [req, min(2), max(50)])
};

const LoginForm = ({ disabled, onSubmit }: LoginForm.Props) => {
  const [form, setForm] = useState(new FormBuilder(config));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof config): void => {
      form.update({ [key]: e.target.value });
      setForm(new FormBuilder(form.fields));
    },
    [form]
  );

  const handleSubmit = (e: Form.Events.Submit) => {
    e.preventDefault();

    onSubmit({
      login: form.fields.login.value,
      password: form.fields.password.value
    });
  };

  return (
    <form className={csx.loginForm} onSubmit={handleSubmit}>
      <InputField
        label="Login"
        placeholder="Login..."
        error={form.fields.login.invalid ? 'Invalid login' : ''}
        value={form.fields.login.value}
        onChange={e => handleChange(e, 'login')}
      />

      <InputField
        type="password"
        label="Password"
        placeholder="Password..."
        error={form.fields.password.invalid ? 'Invalid password' : ''}
        value={form.fields.password.value}
        onChange={e => handleChange(e, 'password')}
      />

      <div className={csx.loginActions}>
        {/* TODO: Replace later with correct value and on Change handler */}
        <Checkbox label="Remember me" value={false} onChange={() => {}} />
        {disabled || <NavLink to="/forgot-password">Forgot password ?</NavLink>}
      </div>

      <Button type="submit" disabled={disabled || form.invalid}>
        SUBMIT
      </Button>
    </form>
  );
};

export default LoginForm;
