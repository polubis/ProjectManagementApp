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
  { label: 'Login', fns: [V.req, V.min(2), V.max(50)] }
];

const LOGIN = 0;

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
            data-idx={LOGIN}
            label={`${BASE_CONFIG[LOGIN].label} *`}
            placeholder={`Type ${BASE_CONFIG[LOGIN].label}...`}
            error={dirty ? fields[LOGIN].error : ''}
            value={fields[LOGIN].value}
            onChange={change}
          />

          <div className={csx.forgotPasswordActions}>
            <NavLink to="/forgot-password">Forgot login or email?</NavLink>
          </div>

          <Button type="submit" disabled={disabled || (dirty && invalid)}>
            RESET
          </Button>
        </form>
      </>
  );
};

export default ForgotPasswordForm;
