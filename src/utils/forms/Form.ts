// type Fn<V, R> = (value: V) => R;

// interface Data {
//   [key: string]: any;
// }

// interface Result<T> {
//   [key: string]: T;
// }

// type Config<D extends Data, R> = {
//   [K in keyof D]?: Fn<D[K], R>[];
// };

// interface ValidationResult<R> {
//   invalid: boolean;
//   result: Result<R>;
// }

// abstract class FormBase<D extends Data, R, T extends FormBase<D, R, T>> {
//   invalid = false;
//   result: Result<R>;

//   constructor(public data: D, public config: Config<D, R> = {}, public dirty = false) {
//     this.set = this.set.bind(this);
//     this.makeResultValue = this.makeResultValue.bind(this);
//     this.makeInvalid = this.makeInvalid.bind(this);
//     this.update = this.update.bind(this);
//     this.validate = this.validate.bind(this);

//     const { invalid, result } = this.validate(data);
//     this.invalid = invalid;
//     this.result = result;
//   }

//   abstract set(data: Partial<D>): T;
//   abstract makeResultValue(key: keyof D, data: Partial<D>): R;
//   abstract makeInvalid(keys: (keyof D)[], result: Result<R>): boolean;

//   update(data: Partial<D>): void {
//     this.data = {
//       ...this.data,
//       ...data
//     };
//   }

//   validate(data: Partial<D>): ValidationResult<R> {
//     const keys = Object.keys(data) as (keyof D)[];
//     const result = keys.reduce(
//       (acc, key) =>
//         ({
//           ...acc,
//           [key]: this.makeResultValue(key, data)
//         } as Result<R>),
//       {} as Result<R>
//     );

//     return {
//       invalid: this.makeInvalid(keys, result),
//       result
//     };
//   }
// }

// export class Form<D extends Data> extends FormBase<D, boolean, Form<D>> {
//   constructor(data: D, config?: Config<D, boolean>) {
//     super(data, config);
//   }

//   set(data: Partial<D>): Form<D> {
//     this.update(data);

//     return new Form<D>(this.data, this.config);
//   }

//   makeResultValue(key: keyof D, data: Partial<D>): boolean {
//     if (!this.config || !Array.isArray(this.config[key])) {
//       return false;
//     }

//     return this.config[key].some(fn => fn(data[key]));
//   }

//   makeInvalid(keys: (keyof D)[], result: Result<boolean>): boolean {
//     return keys.some(key => result[key as string]);
//   }
// }

type Result<D extends Object, R> = {
  [K in keyof D]?: R;
};

type Fn<V, R> = (value: V) => R;

type Config<D extends Object, R> = {
  [K in keyof D]?: Fn<D[K], R>[];
};

interface Formable<D extends Object, R> {
  config?: Config<D, R>;
  data: D;
  dirty: boolean;
  invalid: boolean;
  result: Result<D, R>;
  set(data: Partial<D>): Formable<D, R>;
  submit(): Formable<D, R>;
}

export class Form<D extends Object> implements Formable<D, boolean> {
  invalid: boolean;
  result: Result<D, boolean>;

  constructor(public data: D, public config: Config<D, boolean> = {}, public dirty = false) {
    this.set = this.set.bind(this);
    this.submit = this.submit.bind(this);
    this._validate = this._validate.bind(this);
    
    this._validate(this.data);
  }

  private _validate(data: Partial<D>): void {
    const keys = Object.keys(data) as (keyof D)[];
    this.result = keys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: this.config[key] ? this.config[key].some(fn => fn(data[key])) : false
      } as Result<D, boolean>;
    }, {} as Result<D, boolean>);
    this.invalid = keys.some(key => this.result[key]);
  }

  set(data: Partial<D>): Form<D> {
    return new Form<D>(
      {
        ...this.data,
        ...data
      },
      this.config,
      this.dirty
    );
  }

  submit(): Form<D> {
    return new Form<D>(
      {
        ...this.data
      },
      this.config,
      true
    );
  }
}
