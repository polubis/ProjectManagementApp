export type Fn<A> = (value: A) => boolean;

export type Validator<A, B> = (comparator?: A) => Fn<B>;

export type Iterable<A> = string | A[];

export type Result = Record<string, boolean>;
