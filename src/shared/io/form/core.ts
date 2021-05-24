import {
  Config,
  Dict,
  EnhancedFns,
  Errors,
  Formable,
  Keys,
  Fns,
  Resolvers,
  SubmitEvent,
} from './models';

export class FormCreator<A extends Dict, B> implements Formable<A, B> {
  dirty: boolean;
  fns: EnhancedFns<A, B>;
  keys: Keys<A>;
  errors: Errors<A, B>;
  invalid: boolean;
  pristine: boolean;
  touched: boolean;
  values: A;

  constructor(private _resolvers: Resolvers<A, B>, private _config: Config<A, B>) {
    this._init = this._init.bind(this);
    this._assignValues = this._assignValues.bind(this);
    this._assignErrors = this._assignErrors.bind(this);
    this._assignKeys = this._assignKeys.bind(this);
    this._assignFns = this._assignFns.bind(this);
    this._mergeValues = this._mergeValues.bind(this);
    this._clone = this._clone.bind(this);
    this._validate = this._validate.bind(this);

    this.reset = this.reset.bind(this);
    this.set = this.set.bind(this);
    this.submit = this.submit.bind(this);
  }

  private _assignErrors(): void {
    this.errors = this.keys.reduce(
      (acc, key): Errors<A, B> => ({
        ...acc,
        [key]: this._resolvers.resolveError(this.fns[key], this.values[key]),
      }),
      {} as Errors<A, B>
    );
  }

  private _validate(): void {
    this._assignErrors();
    this.invalid = this._resolvers.resolveInvalid(this.keys, this.errors);
  }

  private _assignValues(values: A): void {
    this.values = values;
    this._validate();
  }

  private _assignKeys(): void {
    this.keys = Object.keys(this._config.values);
  }

  private _assignFns(): void {
    const fns = this._config.fns || ({} as Fns<A, B>);
    this.fns = this.keys.reduce(
      (acc, key): EnhancedFns<A, B> => ({
        ...acc,
        [key]: fns[key] || [],
      }),
      {} as EnhancedFns<A, B>
    );
  }

  private _init(): void {
    this.dirty = false;
    this.pristine = true;
    this.touched = false;
    this._assignKeys();
    this._assignFns();
    this._assignValues(this._config.values);
  }

  private _mergeValues(values: Partial<A>): A {
    return { ...this.values, ...values };
  }

  private _clone(): Formable<A, B> {
    return { ...this };
  }

  reset(): Formable<A, B> {
    this._init();
    return this._clone();
  }

  set(values: Partial<A>): Formable<A, B> {
    this._assignValues(this._mergeValues(values));
    this.touched = true;

    return this._clone();
  }

  submit(e: SubmitEvent = {}): Formable<A, B> {
    e?.preventDefault();

    this.dirty = true;
    this.pristine = false;
    this._validate();

    return this._clone();
  }
}
