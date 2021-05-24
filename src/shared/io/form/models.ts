export type Dict = Record<string, unknown>;

export type Errors<A extends Dict, B> = {
  [K in keyof A]: B;
};

export interface Result<A extends Dict, B> {
  errors: Errors<A, B>;
  invalid: boolean;
}

export type Keys<A extends Dict> = (keyof A)[];

export type Fn<A, B> = (value: A) => B;

export type Fns<A extends Dict, B> = {
  [K in keyof A]?: Fn<A[K], B>[];
};

export type EnhancedFns<A extends Dict, B> = {
  [K in keyof A]: Fn<A[K], B>[];
};

export interface State<A extends Dict, B> extends Result<A, B> {
  dirty: boolean;
  fns: EnhancedFns<A, B>;
  keys: Keys<A>;
  pristine: boolean;
  touched: boolean;
  values: A;
}

export type Event = 'change' | 'submit';

export type SubmitEvent = { preventDefault?: () => void };

export type Subscription = () => void;

export interface Formable<A extends Dict, B> extends State<A, B> {
  reset(): Formable<A, B>;
  set(values: Partial<A>): Formable<A, B>;
  submit(e?: SubmitEvent): Formable<A, B>;
}

export interface Resolvers<A extends Dict, B> {
  resolveError(fnsList: Fn<A[keyof A], B>[], value: A[keyof A]): B;
  resolveInvalid(keys: Keys<A>, errors: Errors<A, B>): boolean;
}

export interface Config<A extends Dict, B> {
  fns?: Fns<A, B>;
  values: A;
}
