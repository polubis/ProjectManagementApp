import {
  Errors,
  Validators,
  Formable,
  Values,
  PartialValues,
  SubmitEvent,
  AsyncTask,
  ValidationStrategy,
} from './models';

export abstract class FormBase<T extends object, R> implements Formable<T, R> {
  protected _validators: Validators<T, R>;
  protected _keys: (keyof T)[] = [];

  dirty = false;
  invalid = false;
  pending = false;
  ready = false;
  touched = false;
  errors: Errors<T, R>;
  values: Values<T>;

  get disabled(): boolean {
    return this.invalid || this.pending;
  }

  abstract getErrors(): Errors<T, R>;
  abstract getInvalid(): boolean;

  constructor(
    protected _values: Values<T>,
    validators?: Validators<T, R>,
    protected _validationStrategy = ValidationStrategy.AfterChange
  ) {
    this._assignValidationResult = this._assignValidationResult.bind(this);
    this._isAfterChangeStrategy = this._isAfterChangeStrategy.bind(this);
    this._isAfterSubmitStrategy = this._isAfterSubmitStrategy.bind(this);
    this.clone = this.clone.bind(this);
    this.reset = this.reset.bind(this);
    this.change = this.change.bind(this);
    this.getInvalid = this.getInvalid.bind(this);
    this.getErrors = this.getErrors.bind(this);
    this.submit = this.submit.bind(this);

    this.values = this._values;
    this._keys = Object.keys(this.values) as (keyof T)[];
    this._validators = validators || {};

    this._assignValidationResult();
  }

  private _isAfterChangeStrategy(): boolean {
    return this._validationStrategy === ValidationStrategy.AfterChange;
  }

  private _isAfterSubmitStrategy(): boolean {
    return this._validationStrategy === ValidationStrategy.AfterSubmit;
  }

  private _assignValidationResult(): void {
    if (this._isAfterChangeStrategy() || (this.dirty && this._isAfterSubmitStrategy())) {
      this.errors = this.getErrors();
      this.invalid = this.getInvalid();

      return;
    }

    this.errors = this._keys.reduce(
      (acc, key) => ({ ...acc, [key]: false } as Errors<T, R>),
      {} as Errors<T, R>
    );
  }

  change(values: PartialValues<T>): void {
    this.values = {
      ...this.values,
      ...values,
    };
    this.touched = true;
    this._assignValidationResult();
  }

  reset(): void {
    if (this.pending) {
      return;
    }

    this.values = this._values;
    this.dirty = false;
    this.touched = false;
    this.ready = false;
    this._assignValidationResult();
  }

  clone(): Formable<T, R> {
    return { ...this };
  }

  async submit(e: SubmitEvent, asyncTask?: AsyncTask<T>): Promise<void> {
    e.preventDefault();

    this.dirty = true;

    if (this.disabled) {
      return;
    }

    if (asyncTask) {
      this.pending = true;

      try {
        await asyncTask(this.values);
        this.pending = false;
        this.ready = true;
      } catch {
        this.pending = false;
      }
    } else {
      this.ready = true;
    }
  }
}
