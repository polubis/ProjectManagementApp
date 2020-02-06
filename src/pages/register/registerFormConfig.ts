import { UseFormConfig, req, min, max } from 'libs/forms';

export type RegisterFormKeys = 'username' | 'email';

export const registerFormConfig: UseFormConfig = {
  username: { value: '' },
  email: { value: '', validators: [req, min(2), max(5)] }
};
