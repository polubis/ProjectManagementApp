import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, InputField, Checkbox } from 'ui';

import { Form, V } from 'utils';

import { LogInPayload } from 'core/api';

import csx from './LoginForm.scss';

namespace LoginForm {
  export interface Props {
    disabled: boolean;
    onSubmit(credentials: LogInPayload): void;
  }
}

const config: Form.Config = [
  { label: 'Username', fns: [V.req, V.min(2), V.max(50)] },
  { label: 'Password', fns: [V.req, V.min(2), V.max(50)] }
];

const [USERNAME, PASSWORD] = [0, 1];

const LoginForm = ({ disabled, onSubmit }: LoginForm.Props) => {
  const [{ fields, dirty, invalid }, change, _, submit] = Form.useManager(config);

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
        label={config[USERNAME].label}
        placeholder={`${config[USERNAME].label}...`}
        error={dirty ? fields[USERNAME].error : ''}
        value={fields[USERNAME].value}
        onChange={change}
      />

      <InputField
        data-idx={PASSWORD}
        type="password"
        label={config[PASSWORD].label}
        placeholder={`${config[PASSWORD].label}...`}
        error={dirty ? fields[PASSWORD].error : ''}
        value={fields[PASSWORD].value}
        onChange={change}
      />

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

export default LoginForm;
