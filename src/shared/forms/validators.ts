import { Validation, Validator } from '.';

const patterns = {
  url: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
};

export const req = (value: string | any[], label: string) =>
  new Validation(
    Array.isArray(value) ? value.length === 0 : value.trim() === '',
    `Please enter your ${label}`
  );

export const min = (ln: number) => (value: string, label: string) =>
  new Validation(value.trim().length < ln, `${label} must have ${ln} or more characters`);

export const max = (ln: number) => (value: string, label: string) =>
  new Validation(value.trim().length > ln, `${label} must have ${ln} or less characters`);

export const url = (value: string, label: string) =>
  new Validation(!patterns.url.test(value), `${label} must have valid url format`);

export const atleastOneChecked = (key: string, label: string) => (items: any[]) =>
  new Validation(!items.some((item) => !!item[key]), `Atleast one ${label} must be checked`);

export const runValidators = (value: any, label: string) => (...fns: Validator[]) =>
  fns.map((fn) => fn(value, label));
