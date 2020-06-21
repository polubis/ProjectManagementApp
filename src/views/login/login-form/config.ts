import { Form, V } from 'utils';

export const loginFormConfig: (Form.Field.Config & { type?: 'password' })[] = [
  { label: 'Login', fns: [V.req] },
  { label: 'Password', fns: [V.req], type: 'password' }
];
