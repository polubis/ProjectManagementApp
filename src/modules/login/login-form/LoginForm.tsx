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
  { label: 'Login', fns: [V.req] },
  { label: 'Password', fns: [V.req] }
];

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
        data-idx={0}
        label={config[0].label}
        placeholder={`${config[0].label}...`}
        error={dirty ? fields[0].error : ''}
        value={fields[0].value}
        onChange={change}
      />

      <InputField
        data-idx={1}
        type="password"
        label={config[1].label}
        placeholder={`${config[1].label}...`}
        error={dirty ? fields[1].error : ''}
        value={fields[1].value}
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
