type Validator<T> = (value: T) => boolean;

class Field<T> {
  constructor(public value: T, public fns: Validator<T>[], error = '') {}
}

type Keys<T> = (keyof T)[];

export class Form<T> {
  keys: Keys<T>;

  values: T;

  constructor(private _values: T) {
    this._makeKeys();
    this._makeValues();
  }

  private _makeKeys(): void {
    this.keys = Object.keys(this._values) as Keys<T>;
  }

  private _makeValues(): void {}
}

const form = new Form({
  email: new Field<string>('', [v => !!v]),
  login: new Field<string[]>([], [v => !!v]),
  username: new Field<number>(1, [v => !!v])
});
