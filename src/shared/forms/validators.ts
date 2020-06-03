import { Validation, Validator } from '.';

export const PATTERNS = {
  URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  DATE: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
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
  new Validation(!PATTERNS.URL.test(value), `${label} must have valid url format`);

export const date = (value: string, label: string) =>
  new Validation(!PATTERNS.DATE.test(value), `${label} must have valid date format`);

export const atleastOneChecked = (key: string, label: string) => (items: any[]) =>
  new Validation(!items.some((item) => !!item[key]), `Atleast one ${label} must be checked`);

export const runValidators = (value: any, label: string) => (...fns: Validator[]) =>
  fns.map((fn) => fn(value, label));
