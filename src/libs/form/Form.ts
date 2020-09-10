// import { IValues, IConfig, IFn, Builder, IValue, Director, Factory } from './abstract';

// class Form {
//   keys: string[];

//   values: IValues;

//   constructor(private _config: IConfig) {
//     this.keys = Object.keys(this._config);
//     this.values = this._makeValues(key =>
//       this._makeValue(this._config[key].value, this._config[key].fns)
//     );
//   }

//   private _isInvalid(value: any, fns: IFn<any>[] = []): boolean {
//     return fns.some(fn => fn(value));
//   }

//   private _makeValue(value: any, fns: IFn<any>[] = []): IValues[keyof IValues] {
//     return { value, invalid: this._isInvalid(value, fns) };
//   }

//   private _makeValues(fn: (key: string) => IValues[keyof IValues]): IValues {
//     return this.keys.reduce(
//       (acc, key): IValues => ({
//         ...acc,
//         [key]: fn(key)
//       }),
//       {} as IValues
//     );
//   }

//   public update(values: IValue): void {
//     this.values = this._makeValues(key =>
//       this._makeValue(values[key] ? values[key] : this._config[key].value, this._config[key].fns)
//     );
//   }
// }

// class FormBuilder extends Builder<Form> {
//   constructor(_config: IConfig) {
//     super(() => new Form(_config));
//   }
// }

// class FormDirector extends Director<Form> {
//   constructor() {
//     super();
//   }
// }

// class FormFactory extends Factory<Form> {
//   constructor(config: IConfig) {
//     const director = new FormDirector();
//     const builder = new FormBuilder(config);

//     super(director, builder);
//   }
// }

// export default (config: IConfig) => new FormFactory(config).create();

type Fn<T> = (value: T) => boolean;

type Field<T> = {
  fns: Fn<T>[];
  invalid: boolean;
  value: T;
};

type Fields = {
  [key: string]: Field<any>;
};

const Field = <T>(value: T, fns: Fn<T>[] = []): Field<T> => ({
  value,
  fns,
  invalid: false
});

const Form = <T extends Fields>(initFields: T) => {
  if (!initFields) {
    throw new Error('Fields object must be typeof Fields');
  }

  const keys = Object.keys(initFields);

  const makeField = (value: any, fns: Fn<any>[]): Field<any> => ({
    invalid: fns.some(fn => fn(value)),
    fns,
    value
  });

  const create = (fields = initFields) => ({
    fields: keys.reduce(
      (acc, key): Fields => ({ ...acc, [key]: makeField(fields[key].value, initFields[key].fns) }),
      {} as Fields
    ) as T,

    set: (partialFields: Partial<T>) => {
      const keys = Object.keys(fields);
      const newFields = keys.reduce(
        (acc, key): Fields => ({
          ...acc,
          [key]: partialFields[key]
            ? makeField(partialFields[key].value, initFields[key].fns)
            : fields[key]
        }),
        { ...fields }
      ) as T;

      return create(newFields);
    }
  });

  return { create };
};

export { Field };

export default Form;
