import { GetError, GetInvalid, Formable, Validators, State, Errors, Formed } from './models';

// class Form {
//   dirty = false;
//   pending = false;
//   invalid = false;

//   strategy = ValidationStrategy.Default | ValidationStrategy.Optimal;

//   errors = {};
//   values = {};
//   validators = {};

//   constructor(public values, public validators) {}

//   change(): void {}

//   submit(): void {}
// }

export const FormsFactory = <R>(getError: GetError<R>, getInvalid: GetInvalid<R>): Formable<R> => {
  const getState = <T extends object>(
    keys: (keyof T)[],
    values: NonNullable<T & Exclude<T, any[]>>,
    validators: Validators<T, R>,
    dirty: boolean
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
      dirty,
      values,
    };
  };

  const getForm = <T extends object>(
    values: NonNullable<T & Exclude<T, any[]>>,
    validators: Validators<T, R> = {}
  ): Formed<T, R> => {
    const keys = Object.keys(values) as (keyof T)[];
    let state = getState<T>(keys, values, validators, false);

    const set = (
      values: Partial<NonNullable<T & Exclude<T, any[]>>>,
      dirty = state.dirty
    ): Formed<T, R> => {
      state = getState<T>(keys, { ...state.values, ...values }, validators, dirty);

      return {
        ...state,
        set,
      };
    };

    return {
      ...state,
      set,
    };
  };

  return getForm;
};
