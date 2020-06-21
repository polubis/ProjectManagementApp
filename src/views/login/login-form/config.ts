import { FieldConfig, V } from 'utils';

export const loginFormConfig: (FieldConfig & { type?: 'password' })[] = [
  { label: 'Login', validators: [V.req] },
  { label: 'Password', validators: [V.req], type: 'password' }
];
