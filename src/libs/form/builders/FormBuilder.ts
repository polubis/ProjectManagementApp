import { IBuilder, IForm, IKeys } from '..';

class Form<T> implements IForm<T> {
  fields: T;

  keys: IKeys<T>;

  constructor(fields: T, keys: IKeys<T>) {
    this.fields = fields;
    this.keys = keys;
  }

  update = <V>(values: V): IForm<T> => {
    return null;
  };
}

export default class FormBuilder<T> implements IBuilder<Form<T>> {
  form: Form<T>;

  constructor(private _fields: T, private _keys: IKeys<T>) {}

  create = (): void => {
    this.form = new Form(this._fields, this._keys);
  };

  get = (): Form<T> => this.form;
}
