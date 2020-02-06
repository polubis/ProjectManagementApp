import { Validation, Validator } from '.';

const RULES = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export const req = (value: string, label: string) => new Validation(value.trim() !== '', `Please enter your ${label}`);

export const min = (ln: number) => (value: string, label: string) =>
  new Validation(!(value.trim().length < ln), `${label} must have ${ln} or more characters`);

export const max = (ln: number) => (value: string, label: string) =>
  new Validation(!(value.trim().length > ln), `${label} must have ${ln} or less characters`);

export const regexp = (regexp: RegExp) => (value: string, label: string) => new Validation(regexp.test(value), `${label} have invalid format`);

export const pattern = (key: keyof typeof RULES) => (value: string, label: string) => regexp(RULES[key])(value, label);

export const validateAll = (value: any, label: string) => (...fns: Validator[]) => fns.map(fn => fn(value, label));

export const validateOne = (value: any, label: string) => (...fns: Validator[]) => {
  for (let i = 0, len = fns.length; i < len; i++) {
    const result = fns[i](value, label);

    if (!result.valid) {
      return result;
    }
  }

  return new Validation(true, '');
};
