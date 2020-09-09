import { Builder } from '.';

/** Holds type definition for object keys. */
type Keys<T> = (keyof T)[];

/** Builds keys array with type definitions. */
export default class KeysBuilder<T> implements Builder<Keys<T>> {
  keys: Keys<T>;

  constructor(private _obj: T) {}

  create = (): void => {
    this.keys = Object.keys(this._obj) as Keys<T>;
  };

  get = (): Keys<T> => this.keys;
}
