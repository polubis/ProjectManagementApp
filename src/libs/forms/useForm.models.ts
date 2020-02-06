import { ChangeEvent } from 'react';

import { Validator, Validation } from '.';

export class UseFormField<T = any> {
  constructor(
    public value: T,
    public errors: Validation[] = [],
    public valid = true
  ) {}
}

export interface UseFormFieldConfig<T = any> {
  value: T;
  validators?: Validator[];
}

// TODO - implement key reading from passed object
export interface UseFormConfig {
  [key: string]: UseFormFieldConfig;
}

export type UseFormFields<T extends string> = {
  [key in T]: UseFormField;
};

export type UseFormChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type UseFormSubmitEvent = ChangeEvent<HTMLFormElement>;

export type UseForm<T extends string> = [
  UseFormFields<T>,
  boolean,
  (event: UseFormChangeEvent) => void,
  (event: UseFormSubmitEvent) => boolean
];
