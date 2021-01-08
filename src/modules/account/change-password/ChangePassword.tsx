import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import Form from 'io-form';

import { InputField, Button, Backdrop } from 'ui';

import { ChangePasswordPayload } from 'shared/models';
import { changePassword } from 'shared/services';
import { useAlertsProvider } from 'shared/providers/alerts';

import csx from './ChangePassword.scss';

const ChangePassword = (): JSX.Element => {
  const history = useHistory();

  const { showAlert } = useAlertsProvider();

  const [pending, setPending] = useState(false);

  const [{ errors, dirty, invalid, next, submit, values }, setForm] = useState(
    Form<ChangePasswordPayload>(
      {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      {
        oldPassword: [(v) => v.length < 3 || v.length > 50],
        newPassword: [(v) => v.length < 3 || v.length > 50],
        confirmNewPassword: [(v) => v.length < 3 || v.length > 50],
      }
    )
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.getAttribute('data-key') as keyof ChangePasswordPayload;

    setForm(
      next({
        [key]: e.target.value,
      })
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const checkedForm = submit(e);

      setForm(checkedForm);

      if (checkedForm.invalid) {
        return;
      }

      setPending(true);

      try {
        await changePassword(values);

        showAlert({ message: 'Password has been changed', type: 'success' });
        history.replace('/account/general');
      } catch (message) {
        setPending(false);
        showAlert({ message });
      }
    },
    [values]
  );

  const handleBack = useCallback(() => {
    history.replace('/account/general');
  }, []);

  const arePasswordDifferent = values.newPassword !== values.confirmNewPassword;

  return (
    <div className={csx.changePassword}>
      <h3>Change password</h3>

      {pending && <Backdrop />}

      <form onSubmit={handleSubmit}>
        <InputField
          data-key="oldPassword"
          label="Old password *"
          type="password"
          placeholder="Old password..."
          error={dirty ? (errors.oldPassword ? 'Invalid password format' : '') : ''}
          value={values.oldPassword}
          onChange={handleChange}
        />

        <InputField
          data-key="newPassword"
          type="password"
          label="New password *"
          placeholder="New password..."
          error={
            dirty
              ? errors.newPassword
                ? 'Invalid password format'
                : arePasswordDifferent
                ? 'New password must have same value as confirmed password'
                : ''
              : ''
          }
          value={values.newPassword}
          onChange={handleChange}
        />

        <InputField
          data-key="confirmNewPassword"
          type="password"
          label="Confirm new password *"
          placeholder="Confirm new password..."
          error={
            dirty
              ? errors.confirmNewPassword
                ? 'Invalid password format'
                : arePasswordDifferent
                ? 'New password must have same value as confirmed password'
                : ''
              : ''
          }
          value={values.confirmNewPassword}
          onChange={handleChange}
        />

        <footer>
          <Button theme="primaryTransparent" type="button" disabled={pending} onClick={handleBack}>
            BACK
          </Button>

          <Button type="submit" disabled={(dirty && (invalid || arePasswordDifferent)) || pending}>
            SUBMIT PASSWORD
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default ChangePassword;
