import { Validators } from '..';

import { RegisterPayload } from './models';

export const getUpdateValuesAttempts = (
  attemps: Partial<RegisterPayload>[] = []
): Partial<RegisterPayload>[] => [
  {},
  { repeatedPassword: '' },
  { password: '' },
  { repeatedPassword: '1994', password: '1994' },
  ...attemps,
];

export const getPayload = (payload: Partial<RegisterPayload> = {}): RegisterPayload => ({
  username: 'piotr',
  email: 'piotr@wp.pl',
  password: 'piotr1994',
  repeatedPassword: 'piotr1994',
  phone: '223332333',
  policyConfirmation: false,
  age: 18,
  items: [{ id: 0, name: 'Item1' }],
  ...payload,
});

export const getValidators = (
  validators: Validators<RegisterPayload, boolean> = {}
): Validators<RegisterPayload, boolean> => ({
  email: null,
  items: undefined,
  username: [(value) => value.length === 0],
  age: [(value) => value < 16],
  policyConfirmation: [(value) => !value],
  repeatedPassword: [(value, values) => value !== values.password],
  ...validators,
});
