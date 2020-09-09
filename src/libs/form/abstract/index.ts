import { IBuilder } from '..';

/** Director in Builder design pattern. */
export class Director {
  /** Takes an object and calls a sequence of methods. */
  construct = <R>({ create, get }: IBuilder<R>): R => {
    create();
    return get();
  };
}
