import { Iterable, Nullish, ValidationManager, Validator } from './models';

export const create = <T, R>(validator: Validator<T, R>): Validator<T, R> => {
  if (!validator.name) {
    console.error('Validator function must have a name');
    Object.defineProperty(validator, 'name', { value: 'unknown' });
  }

  return validator;
};

export const result = <T>(...validators: Validator<T, boolean>[]) => (
  value: T
): Record<string, boolean> =>
  validators.reduce(
    (acc, validator): Record<string, boolean> => ({
      ...acc,
      [validator.name]: validator(value),
    }),
    {} as Record<string, boolean>
  );

export const required = () =>
  create<Nullish<string>, boolean>(
    (value) => value === undefined || value === null || value === ''
  );

export const min = (comparator: number) => create<number, boolean>((value) => value < comparator);

export const minOrEqual = (comparator: number) =>
  create<number, boolean>((value) => value <= comparator);

export const minLength = (comparator: number) =>
  create<Iterable<unknown>, boolean>(<T>(value: Iterable<T>) => value.length < comparator);

export const minLengthOrEqual = (comparator: number) =>
  create<Iterable<unknown>, boolean>(<T>(value: Iterable<T>) => value.length <= comparator);

export const max = (comparator: number) => create<number, boolean>((value) => value > comparator);

export const maxOrEqual = (comparator: number) =>
  create<number, boolean>((value) => value >= comparator);

export const maxLength = (comparator: number) =>
  create<Iterable<unknown>, boolean>(<T>(value: Iterable<T>) => value.length > comparator);

export const maxLengthOrEqual = (comparator: number) =>
  create<Iterable<unknown>, boolean>(<T>(value: Iterable<T>) => value.length >= comparator);

export default {
  required,
  min,
  minLength,
  minOrEqual,
  minLengthOrEqual,
  max,
  maxLength,
  maxLengthOrEqual,
  maxOrEqual,
} as ValidationManager;

// import { useState } from 'react';
// import { FormsFactory, req, min, max, minLength, maxLength, empty } from 'utils';

// const translation = {
//   req: 'Value must be a something',
//   min: 'Something must be a something',
// };

// const form = config(translation);
// const loginForm = form({ login: '', password: '' }, { login: [], password: [] });

// loginForm.set();
// loginForm.new();
// // OR
// loginForm({ login: '', password: '' }); // REMEMBERS VALIDATORS

// // Resets values
// loginForm.reset();

// // LISTENS ON CHANGE SUBSCRIBE
// loginForm.on('login', (value, values) => {
//   console.log(value, values);
// });

// // WAY A

// const ComponentA = () => {
//   const [loginForm, setLoginForm] = useState(Form({ login: '', password: '' }));

//   // loginForm.touched
//   // loginForm.values.login
//   // loginForm.errors.login
//   // loginForm.invalid
//   // loginForm.dirty
//   // loginForm.pristine

//   loginForm.check({
//     login: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     loginForm.set({
//       login: e.target.value,
//     });
//     setLoginForm(
//       loginForm.next({
//         login: e.target.value,
//       })
//     );
//   };

//   const handleSubmit = (e) => {
//     const submittedLoginForm = loginForm.submit(e);

//     setLoginForm(submittedLoginForm);

//     if (!submittedLoginForm.invalid) {
//       // call API
//     }
//   };
// };

// // WAY B

// const ComponentB = () => {
//   const [state, { next, reset, submit, submitCompletely }] = useForm(
//     { login: '', password: '' },
//     { login: [] }
//   );

//   const handleChange = (e) => {
//     next({
//       login: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     const state = submit(e);

//     if (state.invalid) {
//     }
//   };

//   const handleSubmit2 = async (e) => {
//     const handleSave = () => {
//       return new Promise((resolve) => {
//         setLoading(true);
//         ('');
//       });
//     };

//     const [state, response] = await submitCompletely(e, handleSave);
//   };
// };
