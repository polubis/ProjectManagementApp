import { FieldConfig, req } from 'shared/forms';

export const loginFormConfig: (FieldConfig & { type?: 'password' })[] = [
  { label: 'Login', validators: [req] },
  { label: 'Password', validators: [req], type: 'password' }
];
