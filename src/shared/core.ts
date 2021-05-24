import {
  Form,
  FormConfig,
  State,
  ValidationManager,
  BuildConfig,
  ManagableValidation,
  Entries,
} from './models';
import V, { minLength } from './validation';

export const build = <R, M extends ManagableValidation<R>>(buildConfig: BuildConfig<R, M>) => {
  const form = <V extends Record<string, any>>(formConfig: FormConfig<V, R>): Form<V, R, M> => {
    const { values, validators = {} } = formConfig;

    const initState = (): State<V, R, M> => {
      const entries = Object.entries(values) as Entries<V>;

      return {
        dirty: false,
        entries,
        errors: {} as any,
        invalid: false,
        pristine: false,
        result: {},
        touched: false,
        values: { ...values },
      };
    };

    let state = initState();

    const setState = (newState: Partial<State<V, R, M>>): void => {
      state = {
        ...state,
        ...newState,
      };
    };

    const mergeValues = (newValues: Partial<V>): V => ({
      ...state.values,
      ...newValues,
    });

    return {
      ...state,
      new: (values) => {
        setState({
          touched: true,
          values: mergeValues(values),
        });

        return form<V>({ values: state.values, validators });
      },
      rebuild: build,
      reset: () => {
        setState(initState());
      },
      set: (values) => {
        setState({
          touched: true,
          values: mergeValues(values),
        });
      },
    };
  };

  return form;
};

export const form = build<boolean, ValidationManager>({ validationManager: V });

interface LoginPayload {
  login: string;
  password: string;
  code: number;
}

const loginForm = form<LoginPayload>({
  values: { login: '', password: '', code: 1123 },
  validators: { login: [(v) => !v, minLength(2)], code: [(v) => !v] },
});

// loginForm.rebuild<string, { required: () => () => string }>({
//   validationManager: { required: () => () => '' },
// });

// Register validators group => object with validators which can be used later
// Add validation handling => lie min: true, max: false or min: 'Value must be', max: ''
// If someone pass semantic: true to form config => use semantic form validation apply type safety
// Allow to compose own form logic

// const form = Form({ values: { siema: true, ja: 'Piotr' }}, fns: { siema: [], ja: [({ key, value, values }) => value !== '' ]});
