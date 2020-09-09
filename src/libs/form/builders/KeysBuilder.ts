import { IBuilder, IKeys } from '..';

/** Builds keys array with type definitions. */
export default class KeysBuilder<T> implements IBuilder<IKeys<T>> {
  keys: IKeys<T>;

  constructor(private _obj: T) {}

  create = (): void => {
    this.keys = Object.keys(this._obj) as IKeys<T>;
  };

  get = (): IKeys<T> => this.keys;
}
