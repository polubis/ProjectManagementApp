import { Fn, Result } from './models';

export const findUnnamedFn = (...fns: Fn<unknown>[]): Fn<unknown> | undefined =>
  fns.find((fn) => fn.name === undefined);

export const stack = (...fns: Fn<unknown>[]) => <A>(value: A): Result => {
  const unnamedFn = findUnnamedFn(...fns);

  if (!!unnamedFn) {
    throw new Error('There is function without name');
  }

  return fns.reduce(
    (acc, fn): Result => ({
      ...acc,
      [fn.name]: fn(value),
    }),
    {} as Result
  );
};
