import { FormsFactory } from './FormsFactory';

export const Form = FormsFactory<boolean>(
  (key, values, validators) =>
    (validators[key] || []).some((validator) => validator(values[key], values)),
  (key, errors) => errors[key]
);
