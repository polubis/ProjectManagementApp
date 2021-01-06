import { Validators } from '../models';

import { RegisterPayload } from './models';

export const REGISTER_PAYLOAD: RegisterPayload = {
  username: 'piotr',
  email: 'piotr@wp.pl',
  password: 'piotr1994',
  repeatedPassword: 'piotr1994',
  phone: '223332333',
  policyConfirmation: false,
  age: 18,
  items: [{ id: 0, name: 'Item1' }],
};

export const REGISTER_VALIDATORS: Validators<RegisterPayload, boolean> = {
  email: null,
  items: undefined,
  username: [(value) => value.length === 0],
  age: [(value) => value < 16],
  policyConfirmation: [(value) => !value],
  repeatedPassword: [(value, values) => value !== values.password],
  password: [(value, values) => value !== values.repeatedPassword],
};