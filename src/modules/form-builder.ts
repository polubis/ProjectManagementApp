type Validator<T> = (value: T) => boolean;

type Keys<T> = (keyof T)[];

interface FormBuilderElement<T> {
  build(): T;
}

export class Field<T> {
  constructor(public value: T, public validators: Validator<T>[] = [], public invalid = false) {}
}

export class KeysBuilder<T> implements FormBuilderElement<Keys<T>> {
  constructor(private _obj: T) {}

  build(): Keys<T> {
    return Object.keys(this._obj) as Keys<T>;
  }
}

export class FieldsBuilder<T> implements FormBuilderElement<T> {
  constructor(private _fields: T, private _keys: Keys<T>) {}

  // DECORATOR PATTERN
  private _decorateField({ validators, value }: Field<any>): Field<any> {
    return { invalid: validators.some(fn => fn(value)), validators, value };
  }

  build(): T {
    return this._keys.reduce(
      (acc, key): T => ({ ...acc, [key]: this._decorateField(this._fields[key] as any) }),
      {} as T
    );
  }
}

export class Form<T> {
  keys: Keys<T>;

  get invalid() {
    return this.keys.some(key => ((this.fields[key] as any) as Field<any>).invalid);
  }

  constructor(public fields: T) {
    this._setKeys();
    this._setFields();
  }

  private _setKeys(): void {
    this.keys = Object.keys(this.fields) as Keys<T>;
  }

  private _makeField({ validators, value }: Field<any>): Field<any> {
    const invalid = validators.some(fn => fn(value));
    return { invalid, validators, value };
  }

  private _setFields(): void {
    this.fields = this.keys.reduce(
      (acc, key): T => ({ ...acc, [key]: this._makeField(this.fields[key] as any) }),
      {} as T
    );
  }

  /** IMMUTABLE CHAIN OF RESP PATTERN */
  update<F>(values: F): Form<T> {
    const fields = Object.keys(values).reduce((acc, key): Partial<T> => {
      const field = { ...this.fields[key], value: values[key] } as Field<any>;

      return {
        ...acc,
        [key]: this._makeField(field)
      };
    }, {} as Partial<T>);

    return new Form<T>({ ...this.fields, ...fields });
  }
}
