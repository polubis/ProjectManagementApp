import { FormBase } from './FormBase';
import { Errors, FormFactory, FormArgs } from './models';

class FormManager<T extends object> extends FormBase<T, boolean> {
  constructor(...args: FormArgs<T, boolean>) {
    super(...args);
  }

  getErrors(): Errors<T, boolean> {
    const errors = this._keys.reduce(
      (acc, key) =>
        ({
          ...acc,
          [key]: (this._validators[key] || []).some((validator) =>
            validator(this.values[key], this.values)
          ),
        } as Errors<T, boolean>),
      {} as Errors<T, boolean>
    );

    return errors;
  }

  getInvalid(): boolean {
    return this._keys.some((key) => this.errors[key]);
  }
}

// TODO:
// Add observable subscribe approach
// Write validation strategy feature
// Tests is values mutability causes bugs
// Refactor improve tests
// Write hook which consumes these forms
// General refactor and re-exorting
// Write other type of Form
export const Form: FormFactory<boolean> = (...args) => new FormManager(...args);
