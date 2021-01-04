export type Validators<T, R> = {
  [K in keyof T]?: ((value: T[K], values: T) => R)[];
};

export type Errors<T, R> = Record<keyof T, R>;

export type GetError<R> = <T>(
  key: keyof T,
  values: NonNullable<T & Exclude<T, any[]>>,
  validators: Validators<T, R>
) => R;

export type GetInvalid<R> = <T>(key: keyof T, errors: Errors<T, R>) => boolean;

export interface State<T, R> {
  errors: Errors<T, R>;
  invalid: boolean;
  values: NonNullable<T & Exclude<T, any[]>>;
}

export interface Formed<T, R> extends State<T, R> {
  next(values: Partial<NonNullable<T & Exclude<T, any[]>>>): Formed<T, R>;
}

export type Formable<R> = <T extends object>(
  values: NonNullable<T & Exclude<T, any[]>>,
  validators?: Validators<T, R>
) => Formed<T, R>;

export const FormsFactory = <R>(getError: GetError<R>, getInvalid: GetInvalid<R>): Formable<R> => {
  const State = <T extends object>(
    keys: (keyof T)[],
    values: NonNullable<T & Exclude<T, any[]>>,
    validators: Validators<T, R>
  ): State<T, R> => {
    const errors = keys.reduce(
      (acc, key) =>
        ({
          ...acc,
          [key]: getError(key, values, validators),
        } as Errors<T, R>),
      {} as Errors<T, R>
    );

    const invalid = keys.some((key) => getInvalid<T>(key, errors));

    return {
      errors,
      invalid,
      values,
    };
  };

  const Form = <T extends object>(
    values: NonNullable<T & Exclude<T, any[]>>,
    validators: Validators<T, R> = {}
  ): Formed<T, R> => {
    const keys = Object.keys(values) as (keyof T)[];
    let state = State<T>(keys, values, validators);

    const next = (values: Partial<NonNullable<T & Exclude<T, any[]>>>): Formed<T, R> => {
      state = State<T>(keys, { ...state.values, ...values }, validators);

      return {
        ...state,
        next,
      };
    };

    return {
      ...state,
      next,
    };
  };

  return Form;
};
