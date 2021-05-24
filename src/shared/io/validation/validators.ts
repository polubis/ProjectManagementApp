import { Validator, Iterable } from './models';

export const required: Validator<undefined, string> = () => (value) => value === '';

export const min: Validator<number, number> = (comparator) => (value) => value < comparator;

export const minOrEqual: Validator<number, number> = (comparator) => (value) => value <= comparator;

export const minLength: Validator<number, Iterable<unknown>> = (comparator) => <T>(
  value: Iterable<T>
) => value.length < comparator;

export const minLengthOrEqual: Validator<number, Iterable<unknown>> = (comparator) => <T>(
  value: Iterable<T>
) => value.length <= comparator;

export const max: Validator<number, number> = (comparator) => (value) => value > comparator;

export const maxOrEqual: Validator<number, number> = (comparator) => (value) => value >= comparator;

export const maxLength: Validator<number, Iterable<unknown>> = (comparator) => <T>(
  value: Iterable<T>
) => value.length > comparator;

export const maxLengthOrEqual: Validator<number, Iterable<unknown>> = (comparator) => <T>(
  value: Iterable<T>
) => value.length >= comparator;
