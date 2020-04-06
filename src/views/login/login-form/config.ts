import { FieldConfig, req, min, max } from 'shared/forms';

export const loginFormConfig: (FieldConfig & { type?: 'password' })[] = [
  { label: 'Login', validators: [req, min(4), max(10)] },
  { label: 'Password', validators: [req, min(4), max(10)], type: 'password' }
];
