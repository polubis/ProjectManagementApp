import { IBuilder, IFn, IField } from '..';

class Field<T> implements IField<T> {
  invalid = false;

  constructor(public value: T, public fns: IFn<T>[]) {
    this.invalid = this.fns.some(fn => fn(this.value));
  }
}

export default class FieldBuilder<T> implements IBuilder<Field<T>> {
  field: Field<T>;

  constructor(private _value: T, private _fns: IFn<T>[] = []) {}

  create = (): void => {
    this.field = new Field<T>(this._value, this._fns);
  };

  get = (): Field<T> => this.field;
}
