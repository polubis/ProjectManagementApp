export abstract class Builder<T> {
  data: T;

  constructor(private _creationFn: () => T) {}

  build(): Builder<T> {
    this.data = this._creationFn();
    return this;
  }

  get(): T {
    return this.data;
  }
}

export abstract class Director<T> {
  construct(builder: Builder<T>): T {
    return builder.build().get();
  }
}

export abstract class Factory<T> {
  constructor(private _director: Director<T>, private _builder: Builder<T>) {}

  create(): T {
    return this._director.construct(this._builder);
  }
}

export type IFn<T> = (value: T) => boolean;

export interface IConfig {
  [key: string]: {
    fns?: IFn<any>[];
    value: any;
  };
}

export interface IValues {
  [key: string]: {
    value: any;
    invalid: boolean;
  };
}

export interface IValue {
  [key: string]: any;
}
