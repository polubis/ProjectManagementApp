type Values<T> = Record<keyof T, T[keyof T]>;

type Errors<T, R> = Record<keyof T, R>;

type Validator<T, V, R> = (value: V, values: Values<T>) => R;

type Validators<T, R> = {
  [K in keyof T]?: Validator<T, T[K], R>;
};

interface Form<T, R> {
  clone(): Form<T, R>;
  next(newValues: Partial<T>): Form<T, R>;
  errors: Errors<T, R>;
  invalid: boolean;
  validators: Validators<T, R>;
  values: T;
}

type Formable<R> = <T>(values: T, validators?: Validators<T, R>) => Form<T, R>;

type ValidationManager<R> = {
  isInvalid<T>(keys: (keyof T)[], errors: Errors<T, R>): boolean;
  runValidators<T>(
    keys: (keyof T)[],
    values: Values<T>,
    errors: Errors<T, R>,
    validators: Validators<T, R>
  ): Errors<T, R>;
};

const FormBuilder = <R>({ isInvalid, runValidators }: ValidationManager<R>): Formable<R> => {
  const Form: Formable<R> = <T extends Values<T>>(values: T, validators: Validators<T, R> = {}) => {
    const keys = Object.keys(values) as (keyof T)[];

    let invalid = false;
    let errors = {} as Errors<T, R>;

    const updateValues = (newValues: Partial<T>): T => ({
      ...values,
      ...newValues,
    });

    const clone = (): Form<T, R> => Form(values, validators);

    const next = (newValues: Partial<T>): Form<T, R> => {
      values = updateValues(newValues);
      errors = runValidators<T>(keys, values, errors, validators);
      invalid = isInvalid<T>(keys, errors);

      return clone();
    };

    return {
      errors,
      invalid,
      values,
      validators,

      clone,
      next,
    };
  };

  return Form;
};

const Form = FormBuilder<boolean>({
  isInvalid: (keys, errors) => keys.some((key) => errors[key]),
  runValidators: (keys, values, errors, validators) =>
    keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: validators[key] ? (values[key], values) : false,
      }),
      { ...errors }
    ),
});

interface LoginForm {
  username: string;
  phone: number;
}

const loginForm = Form<LoginForm>({ username: 'piotr', phone: 123 });

export { FormBuilder, Form };

// interface LoginForm {
//   email: string;
//   phone: number;
// }

// const form = Form<LoginForm>(
//   { email: "",  phone: 12 },
//   { email: (email, values) => !!values.phone }
// );

// form.next({ phone: 1213 });

// console.log(form.set({ email: "23", number: "23" }).values);

// State({ email: '', username: '', phone: 223 });

// const form = Form();

// const [form, setForm] = useState(Form({}));

// setForm(form.set());
