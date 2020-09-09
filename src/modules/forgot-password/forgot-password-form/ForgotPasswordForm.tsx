import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, InputField } from 'ui';

import { Form, V } from 'utils';

import { ForgotPasswordPayload } from 'core/api';

import csx from './ForgotPasswordForm.scss';

namespace ForgotPasswordForm {
  export interface Props {
    disabled: boolean;
    onSubmit(credentials: ForgotPasswordPayload): void;
  }
}

const BASE_CONFIG: Form.Config = [
  { label: 'Username', fns: [V.req, V.min(2), V.max(50)] }
];

const USERNAME = 0;

const ForgotPasswordForm = ({disabled, onSubmit}: ForgotPasswordForm.Props) => {
  const [{ fields, dirty, invalid }, change, _, submit] = Form.useManager(BASE_CONFIG);

  const handleSubmit = async (e: Form.Events.Submit) => {
    if (submit(e)) {
      return;
    }

    const [{ value: username }] = fields;

    await onSubmit({ username })
  };

  return (
    <>
        <form className={csx.forgotPasswordForm} onSubmit={handleSubmit}>
          <InputField
            data-idx={USERNAME}
            label={`${BASE_CONFIG[USERNAME].label} *`}
            placeholder={`${BASE_CONFIG[USERNAME].label}...`}
            error={dirty ? fields[USERNAME].error : ''}
            value={fields[USERNAME].value}
            onChange={change}
          />

          <div className={csx.actions}>
            <NavLink to="/forgot-password">Forgot username or email?</NavLink>
          </div>

          <Button type="submit" disabled={disabled || (dirty && invalid)}>
            RESET
          </Button>
        </form>
      </>
  );
};

export default ForgotPasswordForm;
