export type Validator<T extends object, V, R> = (
  value: V,
  values: NonNullable<T & Exclude<T, any[]>>
) => R;

export type Validators<T extends object, R> = {
  [K in keyof T]?: Validator<T, T[K], R>[];
};

export type Errors<T extends object, R> = Record<keyof T, R>;

export type GetError<R> = <T extends object>(
  key: keyof T,
  values: NonNullable<T & Exclude<T, any[]>>,
  validators: Validators<T, R>
) => R;

export type GetInvalid<R> = <T extends object>(key: keyof T, errors: Errors<T, R>) => boolean;

export interface State<T extends object, R> {
  errors: Errors<T, R>;
  dirty: boolean;
  invalid: boolean;
  touched: boolean;
  values: NonNullable<T & Exclude<T, any[]>>;
}

export interface Formed<T extends object, R> extends State<T, R> {
  set(values: Partial<NonNullable<T & Exclude<T, any[]>>>, dirty?: boolean): Formed<T, R>;
}

export type Formable<R> = <T extends object>(
  values: NonNullable<T & Exclude<T, any[]>>,
  validators?: Validators<T, R>
) => Formed<T, R>;
