type Validators<T, R> = {
  [K in keyof T]?: ((value: T[K], values: T) => R)[];
};

type PartialValidators<T, R> = {
  [K in keyof T]?: ((value: T[K], values: Partial<NonNullable<T & Exclude<T, any[]>>>) => R)[];
};

type Errors<T, R> = Record<keyof T, R>;

type GetError<R> = <T>(
  key: keyof T,
  values: Partial<NonNullable<T & Exclude<T, any[]>>>,
  validators: PartialValidators<T, R>
) => R;

type GetInvalid<R> = <T>(key: keyof T, errors: Errors<T, R>) => boolean;

interface State<T, R> {
  errors: Errors<T, R>;
  invalid: boolean;
  values: NonNullable<T & Exclude<T, any[]>>;
}

type PartialState<T, R> = Omit<State<T, R>, 'values' | 'errors'> & {
  errors: Partial<Errors<T, R>>;
  values: Partial<NonNullable<T & Exclude<T, any[]>>>;
};

interface Form<T, R> extends State<T, R> {
  next(values: Partial<NonNullable<T & Exclude<T, any[]>>>): Form<T, R>;
}

type Formable<R> = <T extends object>(
  values: NonNullable<T & Exclude<T, any[]>>,
  validators: Validators<T, R>
) => Form<T, R>;

export const FormsFactory = <R>(getError: GetError<R>, getInvalid: GetInvalid<R>): Formable<R> => {
  const State = <T extends object>(
    values: Partial<NonNullable<T & Exclude<T, any[]>>>,
    validators: Validators<T, R>,
    state?: PartialState<T, R>
  ): State<T, R> => {
    const keys = Object.keys(values) as (keyof T)[];

    const errors = {
      ...(state.errors || {}),
      ...keys.reduce(
        (acc, key) =>
          ({
            ...acc,
            [key]: getError(key, values, validators),
          } as Errors<T, R>),
        {} as Errors<T, R>
      ),
    };

    const invalid = state.invalid || keys.some((key) => getInvalid<T>(key, errors));

    return {
      errors,
      invalid,
      values: {
        ...(state.values || {}),
        ...values,
      } as NonNullable<T & Exclude<T, any[]>>,
    };
  };

  const Form = <T extends object>(
    values: NonNullable<T & Exclude<T, any[]>>,
    validators: Validators<T, R>
  ): Form<T, R> => {
    let state = State<T>(values, validators);

    const next = (values: Partial<NonNullable<T & Exclude<T, any[]>>>): Form<T, R> => {
      state = State<T>(values, validators, state);

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
