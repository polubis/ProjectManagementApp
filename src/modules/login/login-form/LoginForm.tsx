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

const form = new FormBuilder(config);

const LoginForm = ({ disabled, onSubmit }: LoginForm.Props) => {
  const [formData, setFormData] = useState(form);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof config): void => {
      formData.update({ [key]: e.target.value });
      setFormData(new FormBuilder(formData.fields));
    },
    [formData]
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
        error={formData.fields.login.invalid ? 'Invalid login' : ''}
        value={formData.fields.login.value}
        onChange={e => handleChange(e, 'login')}
      />

      <InputField
        type="password"
        label="Password"
        placeholder="Password..."
        error={formData.fields.password.invalid ? 'Invalid password' : ''}
        value={formData.fields.password.value}
        onChange={e => handleChange(e, 'password')}
      />

      <div className={csx.loginActions}>
        {/* TODO: Replace later with correct value and on Change handler */}
        <Checkbox label="Remember me" value={false} onChange={() => {}} />
        {disabled || <NavLink to="/forgot-password">Forgot password ?</NavLink>}
      </div>

      <Button type="submit" disabled={disabled || formData.invalid}>
        SUBMIT
      </Button>
    </form>
  );
};

export default LoginForm;
