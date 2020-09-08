type Validator<T> = (value: T) => boolean;

type Keys<T> = (keyof T)[];

export class Field<T> {
  constructor(public value: T, public validators: Validator<T>[] = [], public invalid = false) {}
}

export class FormBuilder<T> {
  keys: Keys<T>;

  fields: T;

  get invalid() {
    return this.keys.some(key => ((this.fields[key] as any) as Field<any>).invalid);
  }

  constructor(private _config: T) {
    this._setKeys();
    this._setFields();
  }

  private _setKeys(): void {
    this.keys = Object.keys(this._config) as Keys<T>;
  }

  private _makeField({ validators, value }: Field<any>): Field<any> {
    const invalid = validators.some(fn => fn(value));
    return { invalid, validators, value };
  }

  private _setFields(): void {
    this.fields = this.keys.reduce(
      (acc, key): T => ({ ...acc, [key]: this._makeField(this._config[key] as any) }),
      {} as T
    );
  }

  public update<F>(values: F): void {
    const fields = Object.keys(values).reduce((acc, key): Partial<T> => {
      const field = { ...this.fields[key], value: values[key] } as Field<any>;

      return {
        ...acc,
        [key]: this._makeField(field)
      };
    }, {} as Partial<T>);

    this.fields = {
      ...this.fields,
      ...fields
    };
  }
}
