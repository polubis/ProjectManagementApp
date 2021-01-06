import { Form } from '../Form';
import { Errors, Formable, SubmitEvent, AsyncTask, ValidationStrategy } from '../models';

import { RegisterPayload } from './models';
import { REGISTER_PAYLOAD, REGISTER_VALIDATORS } from './utils';

describe('Form', () => {
  const testErrorsAssign = (
    form: Formable<RegisterPayload, boolean>,
    errors: Partial<Errors<RegisterPayload, boolean>> = {}
  ): void => {
    expect(form.errors).toEqual({
      username: false,
      email: false,
      password: false,
      repeatedPassword: false,
      phone: false,
      policyConfirmation: false,
      age: false,
      items: false,
      ...errors,
    } as Errors<RegisterPayload, boolean>);
  };

  const successAsyncTask: AsyncTask<RegisterPayload> = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      })
  );

  const failureAsyncTask: AsyncTask<RegisterPayload> = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject();
        }, 1000);
      })
  );

  describe('on init', () => {
    describe(`on ${ValidationStrategy.AfterChange} validation strategy`, () => {
      it('assigns errors', () => {
        testErrorsAssign(Form<RegisterPayload>(REGISTER_PAYLOAD));
        testErrorsAssign(Form<RegisterPayload>(REGISTER_PAYLOAD, {}));
        testErrorsAssign(Form<RegisterPayload>(REGISTER_PAYLOAD, undefined));
        testErrorsAssign(Form<RegisterPayload>(REGISTER_PAYLOAD, null));
        testErrorsAssign(Form<RegisterPayload>(REGISTER_PAYLOAD, REGISTER_VALIDATORS), {
          policyConfirmation: true,
        });
        testErrorsAssign(
          Form<RegisterPayload>(
            { ...REGISTER_PAYLOAD, repeatedPassword: '', age: 15 },
            REGISTER_VALIDATORS
          ),
          {
            password: true,
            repeatedPassword: true,
            policyConfirmation: true,
            age: true,
          }
        );
      });

      it('assigns invalid flag', () => {
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD).invalid).toBe(false);
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD, {}).invalid).toBe(false);
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD, undefined).invalid).toBe(false);
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD, null).invalid).toBe(false);
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD, REGISTER_VALIDATORS).invalid).toBe(true);
      });

      it('assigns disabled flag', () => {
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD).disabled).toBe(false);
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD, {}).disabled).toBe(false);
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD, undefined).disabled).toBe(false);
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD, null).disabled).toBe(false);
        expect(Form<RegisterPayload>(REGISTER_PAYLOAD, REGISTER_VALIDATORS).disabled).toBe(true);
      });
    });

    describe(`on ${ValidationStrategy.AfterSubmit} validation strategy`, () => {
      it('assigns errors', () => {
        const form = Form<RegisterPayload>(
          REGISTER_PAYLOAD,
          REGISTER_VALIDATORS,
          ValidationStrategy.AfterSubmit
        );

        expect(form.errors).toEqual({
          username: false,
          email: false,
          password: false,
          repeatedPassword: false,
          phone: false,
          policyConfirmation: false,
          age: false,
          items: false,
        });
      });

      it('assigns invalid flag', () => {
        const form = Form<RegisterPayload>(
          REGISTER_PAYLOAD,
          REGISTER_VALIDATORS,
          ValidationStrategy.AfterSubmit
        );

        form.submit({ preventDefault: () => {} });
        // TU SKONCZYLEM
        expect(form.invalid).toBe(false);
      });

      it('assigns disabled flag', () => {});
    });

    it('assigns rest data', () => {
      const testInitialization = (form: Formable<RegisterPayload, boolean>): void => {
        expect(form.values).toEqual(REGISTER_PAYLOAD);
        expect(form.dirty).toBe(false);
        expect(Object.keys(form.errors)).toEqual(Object.keys(REGISTER_PAYLOAD));
        expect(form.pending).toBe(false);
        expect(form.ready).toBe(false);
        expect(form.touched).toBe(false);
      };

      testInitialization(Form<RegisterPayload>(REGISTER_PAYLOAD));
      testInitialization(Form<RegisterPayload>(REGISTER_PAYLOAD, {}));
      testInitialization(Form<RegisterPayload>(REGISTER_PAYLOAD, null));
      testInitialization(Form<RegisterPayload>(REGISTER_PAYLOAD, undefined));
      testInitialization(Form<RegisterPayload>(REGISTER_PAYLOAD, REGISTER_VALIDATORS));
    });
  });

  describe('change()', () => {
    it('merges values', () => {
      const form = Form<RegisterPayload>(REGISTER_PAYLOAD);

      expect(form.values).toEqual(REGISTER_PAYLOAD);

      form.change({ repeatedPassword: '' });

      expect(form.values).toEqual({ ...REGISTER_PAYLOAD, repeatedPassword: '' });
    });

    it('marks as touched', () => {
      const form = Form({});

      expect(form.touched).toBe(false);

      form.change({});

      expect(form.touched).toBe(true);

      form.change({});

      expect(form.touched).toBe(true);
    });

    describe(`on ${ValidationStrategy.AfterChange} validation strategy`, () => {
      it('assigns errors', () => {
        const form = Form<RegisterPayload>(REGISTER_PAYLOAD, REGISTER_VALIDATORS);

        testErrorsAssign(form, { policyConfirmation: true });

        form.change({ age: 14, repeatedPassword: '', policyConfirmation: true });

        testErrorsAssign(form, {
          age: true,
          repeatedPassword: true,
          password: true,
        });

        form.change({
          age: 18,
          repeatedPassword: REGISTER_PAYLOAD.repeatedPassword,
        });

        testErrorsAssign(form);
      });

      it('assigns invalid flag', () => {
        const form = Form<RegisterPayload>(REGISTER_PAYLOAD, REGISTER_VALIDATORS);

        expect(form.invalid).toBe(true);

        form.change({
          ...REGISTER_PAYLOAD,
          policyConfirmation: true,
        });

        expect(form.invalid).toBe(false);

        form.change({
          policyConfirmation: false,
        });

        expect(form.invalid).toBe(true);
      });

      it('assigns disabled flag', () => {
        const form = Form<RegisterPayload>(REGISTER_PAYLOAD, REGISTER_VALIDATORS);

        expect(form.disabled).toBe(true);

        form.change({
          ...REGISTER_PAYLOAD,
          policyConfirmation: true,
        });

        expect(form.disabled).toBe(false);

        form.change({
          policyConfirmation: false,
        });

        expect(form.disabled).toBe(true);
      });
    });

    describe(`on ${ValidationStrategy.AfterSubmit} validation strategy`, () => {});
  });

  describe('clone()', () => {
    it('clones with current state', () => {
      const form = Form(REGISTER_PAYLOAD, REGISTER_VALIDATORS);

      expect(form.clone() !== form).toBeTruthy();
    });
  });

  describe('reset()', () => {
    it('prevents call for truthy pending flag', async () => {
      const form = Form({});

      expect(form.dirty).toBe(false);

      const result = form.submit({ preventDefault: () => {} }, successAsyncTask);

      expect(form.dirty).toBe(true);

      form.reset();
      form.reset();
      form.reset();

      expect(form.dirty).toBe(true);

      await result;

      form.reset();

      expect(form.dirty).toBe(false);

      return result;
    });

    it('resets state to initial', () => {
      const form = Form(REGISTER_PAYLOAD, REGISTER_VALIDATORS);

      testErrorsAssign(form, { policyConfirmation: true });
      expect(form.values).toEqual(REGISTER_PAYLOAD);
      expect(form.dirty).toBe(false);
      expect(form.pending).toBe(false);
      expect(form.ready).toBe(false);
      expect(form.touched).toBe(false);
      expect(form.invalid).toBe(true);
      expect(form.disabled).toBe(true);

      form.change({
        ...REGISTER_PAYLOAD,
        policyConfirmation: true,
      });

      expect(form.touched).toBe(true);
      expect(form.values).toEqual({
        ...REGISTER_PAYLOAD,
        policyConfirmation: true,
      });
      testErrorsAssign(form, { policyConfirmation: false });
      expect(form.invalid).toBe(false);
      expect(form.disabled).toBe(false);

      form.submit({ preventDefault: () => {} });

      expect(form.dirty).toBe(true);
      expect(form.ready).toBe(true);

      form.reset();

      testErrorsAssign(form, { policyConfirmation: true });
      expect(form.values).toEqual(REGISTER_PAYLOAD);
      expect(form.dirty).toBe(false);
      expect(form.pending).toBe(false);
      expect(form.ready).toBe(false);
      expect(form.touched).toBe(false);
      expect(form.invalid).toBe(true);
      expect(form.disabled).toBe(true);
    });
  });

  describe('submit()', () => {
    const SUBMIT_EVENT: SubmitEvent = { preventDefault: () => {} };

    it('prevents default', () => {
      const preventDefaultSpy = jest.fn().mockImplementation(() => {});
      const form = Form({});

      form.submit({ preventDefault: preventDefaultSpy });
      form.submit({ preventDefault: preventDefaultSpy });
      form.submit({ preventDefault: preventDefaultSpy });

      expect(preventDefaultSpy).toHaveBeenCalledTimes(3);
    });

    it('marks as dirty', () => {
      const form = Form({});

      expect(form.dirty).toBe(false);

      form.submit(SUBMIT_EVENT);

      expect(form.dirty).toBe(true);

      form.submit(SUBMIT_EVENT);

      expect(form.dirty).toBe(true);
    });

    describe('if form is disabled', () => {
      it('just marks as dirty', () => {
        const asyncTaskSpy = jest.fn().mockImplementation(() => Promise.resolve());
        const form = Form<RegisterPayload>(REGISTER_PAYLOAD, REGISTER_VALIDATORS);

        form.submit(SUBMIT_EVENT, asyncTaskSpy);

        expect(asyncTaskSpy).toHaveBeenCalledTimes(0);
        expect(form.ready).toBe(false);
      });
    });

    describe('if form is not disabled', () => {
      describe('if async task function given', () => {
        it('calls once', () => {
          const asyncTaskSpy = jest.fn().mockImplementation(() => Promise.resolve());
          const form = Form({});

          form.submit(SUBMIT_EVENT, asyncTaskSpy);

          expect(asyncTaskSpy).toHaveBeenCalledTimes(1);
        });

        it('calls with values', () => {
          const asyncTaskSpy = jest.fn().mockImplementation(() => Promise.resolve());
          const form = Form(REGISTER_PAYLOAD);

          form.submit(SUBMIT_EVENT, asyncTaskSpy);

          expect(asyncTaskSpy).toHaveBeenCalledWith(REGISTER_PAYLOAD);
        });

        it('assigns disabled flag', async () => {
          const form = Form<RegisterPayload>(REGISTER_PAYLOAD);

          expect(form.disabled).toBe(false);

          const result = form.submit(SUBMIT_EVENT, successAsyncTask);

          expect(form.disabled).toBe(true);

          await result;

          expect(form.disabled).toBe(false);

          return result;
        });

        it('sets pending flag before call', () => {
          const form = Form({});

          form.submit(SUBMIT_EVENT, () => Promise.resolve());

          expect(form.pending).toBe(true);
        });

        describe('resets pending flag after async task', () => {
          it('ends with success', async () => {
            const form = Form<RegisterPayload>(REGISTER_PAYLOAD);

            const result = await form.submit(SUBMIT_EVENT, successAsyncTask);

            expect(form.pending).toBe(false);

            return result;
          });

          it('fails', async () => {
            const form = Form<RegisterPayload>(REGISTER_PAYLOAD);

            const result = await form.submit(SUBMIT_EVENT, failureAsyncTask);

            expect(form.pending).toBe(false);

            return result;
          });
        });

        it('sets ready flag after success', async () => {
          const form = Form<RegisterPayload>(REGISTER_PAYLOAD);

          expect(form.ready).toBe(false);

          const result = await form.submit(SUBMIT_EVENT, successAsyncTask);

          expect(form.ready).toBe(true);

          return result;
        });
      });

      describe('if no async task function', () => {
        it('sets ready flag', async () => {
          const form = Form<RegisterPayload>(REGISTER_PAYLOAD);

          expect(form.ready).toBe(false);

          const result = await form.submit(SUBMIT_EVENT);

          expect(form.ready).toBe(true);

          return result;
        });
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
