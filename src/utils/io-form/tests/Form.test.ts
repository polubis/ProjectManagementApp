import { Form, Errors, Validators } from '..';

describe('Form', () => {
  interface Values {
    username: string;
    email: string;
    password: string;
    repeatedPassword: string;
    phone: string;
    policyConfirmation: boolean;
    age: number;
    items: {
      id: number;
      name: string;
    }[];
  }

  const VALUES: Values = {
    username: 'piotr',
    email: 'piotr@wp.pl',
    password: 'piotr1994',
    repeatedPassword: 'piotr1994',
    phone: '223332333',
    policyConfirmation: false,
    age: 18,
    items: [{ id: 0, name: 'Item1' }],
  };

  const VALIDATORS: Validators<Values, boolean> = {
    email: null,
    items: undefined,
    username: [(value) => value.length === 0],
    age: [(value) => value < 16],
    policyConfirmation: [(value) => !value],
    repeatedPassword: [(value, values) => value !== values.password],
    password: [(value, values) => value !== values.repeatedPassword],
  };

  it('inits', () => {
    expect(Form<Values>(VALUES).values).toEqual(VALUES);
    expect(Form<Values>(VALUES).invalid).toBe(false);
    expect(Form<Values>(VALUES).errors).toEqual({
      username: false,
      email: false,
      password: false,
      repeatedPassword: false,
      phone: false,
      policyConfirmation: false,
      age: false,
      items: false,
    } as Errors<Values, boolean>);
    expect(Form<Values>(VALUES).next).toBeTruthy();
  });

  it('validates on init', () => {
    const form = Form<Values>({ ...VALUES, repeatedPassword: '', age: 15 }, VALIDATORS);

    expect(form.invalid).toBe(true);
    expect(form.errors).toEqual({
      username: false,
      email: false,
      password: true,
      repeatedPassword: true,
      phone: false,
      policyConfirmation: true,
      age: true,
      items: false,
    } as Errors<Values, boolean>);
  });

  it('validates on update', () => {
    const firstAttemptForm = Form<Values>({ ...VALUES, repeatedPassword: '', age: 15 }, VALIDATORS);

    expect(firstAttemptForm.invalid).toBe(true);
    expect(firstAttemptForm.errors).toEqual({
      username: false,
      email: false,
      password: true,
      repeatedPassword: true,
      phone: false,
      policyConfirmation: true,
      age: true,
      items: false,
    } as Errors<Values, boolean>);

    const secondAttemptForm = firstAttemptForm.next({ repeatedPassword: 'piotr1994', age: 16 });

    expect(secondAttemptForm.invalid).toBe(true);
    expect(secondAttemptForm.errors).toEqual({
      username: false,
      email: false,
      password: false,
      repeatedPassword: false,
      phone: false,
      policyConfirmation: true,
      age: false,
      items: false,
    } as Errors<Values, boolean>);

    const thirdAttemptForm = secondAttemptForm.next({ policyConfirmation: true });

    expect(thirdAttemptForm.invalid).toBe(false);
    expect(thirdAttemptForm.errors).toEqual({
      username: false,
      email: false,
      password: false,
      repeatedPassword: false,
      phone: false,
      policyConfirmation: false,
      age: false,
      items: false,
    } as Errors<Values, boolean>);
  });
});
