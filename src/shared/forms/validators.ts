import { Validation, Validator } from '.';

export const req = (value: string, label: string) => new Validation(value.trim() === '', `Please enter your ${label}`);

export const min = (ln: number) => (value: string, label: string) =>
  new Validation(value.trim().length < ln, `${label} must have ${ln} or more characters`);

export const max = (ln: number) => (value: string, label: string) =>
  new Validation(value.trim().length > ln, `${label} must have ${ln} or less characters`);

export const runValidators = (value: any, label: string) => (...fns: Validator[]) => fns.map(fn => fn(value, label));