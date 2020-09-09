export interface IBuilder<R> {
  create(): void;
  get(): R;
}

export type IFn<T> = (value: T) => boolean;

export type IKeys<T> = (keyof T)[];

export interface IField<T> {
  invalid: boolean;
  fns: IFn<T>[];
  value: T;
}

export interface IForm<T> {
  keys: IKeys<T>;
  fields: T;
  update<V>(values: V): IForm<T>;
}