export type Values<T extends object> = NonNullable<T & Exclude<T, any[]>>;

export type PartialValues<T extends object> = Partial<Values<T>>;

export type Validator<T extends object, V, R> = (value: V, values: Values<T>) => R;

export type Validators<T extends object, R> = {
  [K in keyof T]?: Validator<T, T[K], R>[];
};

export type Errors<T extends object, R> = Record<keyof T, R>;

export interface SubmitEvent {
  preventDefault(): void;
}

export type AsyncTask<T extends object> = (values: Values<T>) => Promise<void>;

export interface Formable<T extends object, R> {
  dirty: boolean;
  invalid: boolean;
  pending: boolean;
  disabled: boolean;
  ready: boolean;
  touched: boolean;
  values: Values<T>;
  errors: Errors<T, R>;
  change(values: PartialValues<T>): void;
  clone(): Formable<T, R>;
  reset(): void;
  submit(e: SubmitEvent, asyncTask?: AsyncTask<T>): void;
}

export type FormArgs<T extends object, R> = [Values<T>, Validators<T, R>?, ValidationStrategy?];

export enum ValidationStrategy {
  AfterChange = 'AfterChange',
  AfterSubmit = 'AfterSubmit',
}

export type FormFactory<R> = <T extends object>(...args: FormArgs<T, R>) => Formable<T, R>;
