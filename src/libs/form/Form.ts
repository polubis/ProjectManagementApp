import { Builder } from '.';

/** Director in Builder design pattern. */
export default class Form {
  /** Takes an object and calls a sequence of methods. */
  construct = <R>({ create, get }: Builder<R>): R => {
    create();
    return get();
  };
}
