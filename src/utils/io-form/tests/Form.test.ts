import { Form, Formed, Errors } from '..';

import { RegisterPayload } from './models';
import { getPayload, getValidators, getUpdateValuesAttempts } from './utils';

describe('Form', () => {
  const testValuesUpdate = (values: Partial<RegisterPayload>): void =>
    expect(Form<RegisterPayload>(getPayload(values), getValidators()).values).toEqual(
      getPayload(values)
    );

  const testValuesUpdateSequence = (
    values: Partial<RegisterPayload>[],
    form: Formed<RegisterPayload, boolean>
  ): void => {
    let prevForm = form;

    values.forEach((attempt) => {
      prevForm = prevForm.next(attempt);
      expect(prevForm.values).toEqual({ ...prevForm.values, ...attempt });
    });
  };

  describe('on init', () => {
    it('assigns values', () => {
      testValuesUpdate({});
    });

    it('assigns errors', () => {
      const form = Form<RegisterPayload>(getPayload({ repeatedPassword: '' }), getValidators());

      expect(form.errors).toEqual({
        email: false,
        username: false,
        items: false,
        age: false,
        password: false,
        phone: false,
        policyConfirmation: true,
        repeatedPassword: true,
      } as Errors<RegisterPayload, boolean>);
    });

    it('assings invalid flag', () => {
      (() => {
        expect(
          Form<RegisterPayload>(getPayload({ repeatedPassword: '' }), getValidators()).invalid
        ).toBe(true);
      })();

      (() => {
        expect(Form<RegisterPayload>(getPayload(), {}).invalid).toBe(false);
      })();
    });
  });

  it('updates values', () => {
    getUpdateValuesAttempts().forEach(testValuesUpdate);

    testValuesUpdateSequence(
      getUpdateValuesAttempts(),
      Form<RegisterPayload>(getPayload(), getValidators())
    );
  });
});
