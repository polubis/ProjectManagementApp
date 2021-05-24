export type Validator<T, R> = (value: T) => R;

export type ComparableValidator<C, T, R> = (comparator?: C) => Validator<T, R>;

export type Nullish<T> = undefined | null | T;

export type Iterable<T> = string | T[];

export type ValidationErrors<V extends Record<string, any>, R> = {
  [K in keyof V]: R;
};

export type ValidationResult<M extends Record<string, any>, R> = {
  [K in keyof M]?: R;
};

export interface FormConfig<V extends Record<string, any>, R> {
  validators?: Validators<V, R>;
  values: V;
}

export type FormCreator<R, M extends ManagableValidation<R>> = <V extends Record<string, any>>(
  formConfig: FormConfig<V, R>
) => Form<V, R, M>;

export type FormsBuilder = <R, M extends ManagableValidation<R>>(
  buildConfig: BuildConfig<R, M>
) => FormCreator<R, M>;

export type Validators<V extends Record<string, any>, R> = {
  [K in keyof V]?: Validator<V[K], R>[];
};

export type Entries<V extends Record<string,any>> = [keyof V, V[keyof V]]

export interface State<V extends Record<string, any>, R, M> {
  dirty: boolean;
  entries: (keyof V)[];
  errors: ValidationErrors<V, R>;
  invalid: boolean;
  pristine: boolean;
  result: ValidationResult<M, R>;
  touched: boolean;
  values: V;
}

export type ManagableValidation<R> = {
  [key: string]: ComparableValidator<unknown, unknown, R>;
};

export interface BuildConfig<R, M extends ManagableValidation<R>> {
  validationManager: M;
}

export interface Form<V extends Record<string, any>, R, M> extends State<V, R, M> {
  new: (values: Partial<V>) => Form<V, R, M>;
  reset: () => void;
  rebuild: <NR, NM extends ManagableValidation<NR>>(
    builderConfig: BuildConfig<NR, NM>
  ) => FormCreator<NR, NM>;
  set: (values: Partial<V>) => void;
}

export type ValidationManagerPart<P> = {
  [K in keyof P]: ComparableValidator<unknown, unknown, unknown>;
};

export type ValidationManager = {
  required: ComparableValidator<undefined, Nullish<string>, boolean>;
  min: ComparableValidator<number, number, boolean>;
  minOrEqual: ComparableValidator<number, number, boolean>;
  minLength: ComparableValidator<number, Iterable<unknown>, boolean>;
  minLengthOrEqual: ComparableValidator<number, Iterable<unknown>, boolean>;
  max: ComparableValidator<number, number, boolean>;
  maxOrEqual: ComparableValidator<number, number, boolean>;
  maxLength: ComparableValidator<number, Iterable<unknown>, boolean>;
  maxLengthOrEqual: ComparableValidator<number, Iterable<unknown>, boolean>;
};

export type ValidationManagerKeys = keyof ValidationManager;
