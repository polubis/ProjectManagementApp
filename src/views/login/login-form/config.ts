import { Form, V } from 'utils';

export const loginFormConfig: (Form.Field.Config & { type?: 'password' })[] = [
  { label: 'Login', validators: [V.req] },
  { label: 'Password', validators: [V.req], type: 'password' }
];
