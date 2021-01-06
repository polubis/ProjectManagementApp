import { Errors } from '../models';
import { Form } from '../Form';

import { VALUES, VALIDATORS } from './utils';
import { Values } from './models';

describe('Form', () => {
  it('inits', () => {
    expect(Form<Values>(VALUES).values).toEqual(VALUES);
    expect(Form<Values>(VALUES).invalid).toBe(false);
    expect(Form<Values>(VALUES).touched).toBe(false);
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
    expect(Form<Values>(VALUES).dirty).toBe(false);
    expect(Form<Values>(VALUES).set).toBeTruthy();
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

  it('updates values', () => {
    const firstAttemptForm = Form<Values>(VALUES);

    expect(firstAttemptForm.values).toEqual(VALUES);

    const secondAttemptForm = firstAttemptForm.set({ repeatedPassword: '' });

    expect(secondAttemptForm.values).toEqual({ ...VALUES, repeatedPassword: '' });

    const thirdAttemptForm = secondAttemptForm.set({ age: 12 });

    expect(thirdAttemptForm.values).toEqual({ ...VALUES, repeatedPassword: '', age: 12 });
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

    const secondAttemptForm = firstAttemptForm.set({ repeatedPassword: 'piotr1994', age: 16 });

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

    const thirdAttemptForm = secondAttemptForm.set({ policyConfirmation: true });

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

  it('marks as touched', () => {
    const firstAttemptForm = Form<Values>(VALUES);

    expect(firstAttemptForm.touched).toBe(false);

    const secondAttemptForm = firstAttemptForm.set({ repeatedPassword: '' });

    expect(secondAttemptForm.touched).toBe(true);

    const thirdAttemptForm = secondAttemptForm.set({ repeatedPassword: 'password' });

    expect(thirdAttemptForm.touched).toBe(true);
  });

  it('marks as dirty', () => {
    const form = Form<Values>(VALUES);

    expect(form.dirty).toBe(false);
    expect(form.set({}, true).dirty).toBe(true);
  });
});
