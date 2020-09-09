import { Builder } from '.';

type Fn<T> = (value: T) => boolean;

class Field<T> {
  invalid = false;

  constructor(public value: T, public fns: Fn<T>[]) {
    this.invalid = this.fns.some(fn => fn(this.value));
  }
}

export default class FieldBuilder<T> implements Builder<Field<T>> {
  field: Field<T>;

  constructor(private _value: T, private _fns: Fn<T>[] = []) {}

  create = (): void => {
    this.field = new Field<T>(this._value, this._fns);
  };

  get = (): Field<T> => this.field;
}
