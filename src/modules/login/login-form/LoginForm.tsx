import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, InputField } from 'ui';

import { Form, V } from 'utils';

import { LogInPayload } from 'core/api';

import csx from './LoginForm.scss';

namespace LoginForm {
  export interface Props {
    disabled: boolean;
    onSubmit(credentials: LogInPayload): void;
  }
}

const BASE_CONFIG: Form.Config = [
  { label: 'Username', fns: [V.req, V.min(2), V.max(50)] },
  { label: 'Password', fns: [V.req, V.min(2), V.max(50)] }
];

const [USERNAME, PASSWORD] = [0, 1];

const LoginForm = ({ disabled, onSubmit }: LoginForm.Props) => {
  const [{ fields, dirty, invalid }, change, _, submit] = Form.useManager(BASE_CONFIG);

  const handleSubmit = (e: Form.Events.Submit) => {
    if (submit(e)) {
      return;
    }

    const [{ value: login }, { value: password }] = fields;

    onSubmit({ login, password });
  };

  return (
    <form className={csx.loginForm} onSubmit={handleSubmit}>
      <InputField
        data-idx={USERNAME}
        label={BASE_CONFIG[USERNAME].label}
        placeholder={`${BASE_CONFIG[USERNAME].label}...`}
        error={dirty ? fields[USERNAME].error : ''}
        value={fields[USERNAME].value}
        onChange={change}
      />

      <InputField
        data-idx={PASSWORD}
        type="password"
        label={BASE_CONFIG[PASSWORD].label}
        placeholder={`${BASE_CONFIG[PASSWORD].label}...`}
        error={dirty ? fields[PASSWORD].error : ''}
        value={fields[PASSWORD].value}
        onChange={change}
      />

      <div className={csx.loginActions}>
        {disabled || <NavLink to="/forgotten-password">Forgot password ?</NavLink>}
      </div>

      <Button type="submit" disabled={disabled || (dirty && invalid)}>
        SUBMIT
      </Button>
    </form>
  );
};

export default LoginForm;
