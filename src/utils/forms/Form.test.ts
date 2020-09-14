import { Form, Errors, Config } from '.';

describe('Form', () => {
  interface RegisterData {
    code: number;
    email: string;
    username: string;
  }

  const minLength = (ln: number) => (value: string | any[]) => value.length < ln;

  describe('on init', () => {
    it('assigns values', () => {
      const initData: RegisterData = { code: 2223, email: '', username: 'piotr1994' };

      const test = ({ data, dirty, errors, keys, invalid }: Form<RegisterData>): void => {
        expect(data).toEqual(initData);
        expect(dirty).toBeFalsy();
        expect(errors).toEqual({ code: false, email: false, username: false } as Errors<
          RegisterData
        >);
        expect(invalid).toBeFalsy();
        expect(keys).toEqual(Object.keys(data));
      };

      test(new Form(initData));
      test(Form.init(initData));
    });

    it('validates', () => {
      const initData: RegisterData = { code: 2223, email: '', username: '' };
      const config: Config<RegisterData> = { username: [minLength(4)] };

      const test = ({ errors, invalid }: Form<RegisterData>): void => {
        expect(errors).toEqual({ code: false, email: false, username: true } as Errors<
          RegisterData
        >);
        expect(invalid).toBeTruthy();
      };

      test(new Form(initData, config));
      test(Form.init(initData, config));
    });
  });

  describe('set()', () => {
    const initData: RegisterData = { code: 2223, email: '', username: '' };
    const testData: Partial<RegisterData> = {
      email: 'example@gmail.com',
      username: 'example-user'
    };

    it('updates data', () => {
      const test = (form: Form<RegisterData>): void => {
        const { data } = form.set(testData);

        expect(data).toEqual({
          ...initData,
          ...data
        });
      };

      test(new Form(initData));
      test(Form.init(initData));
    });

    it('validates', () => {
      const config: Config<RegisterData> = {
        code: [value => !value],
        email: [minLength(4)],
        username: [minLength(8)]
      };

      const test = (form: Form<RegisterData>): void => {
        const { errors, invalid } = form.set(testData);

        expect(errors).toEqual({
          code: false,
          email: false,
          username: false
        } as Errors<RegisterData>);
        expect(invalid).toBeFalsy();
      };

      test(new Form(initData, config));
      test(Form.init(initData, config));
    });
  });

  describe('submit()', () => {
    it('sets dirty flag after submit', () => {
      const test = (form: Form<any>): void => {
        const newForm = form.submit({ preventDefault: () => {} });

        expect(newForm.dirty).toBeTruthy();
      };

      test(new Form({}));
      test(Form.init({}));
    });

    it('prevents default for event object', () => {
      const preventDefault = jest.fn();
      const test = (form: Form<any>): void => {
        form.submit({ preventDefault });
      };

      test(new Form({}));
      test(Form.init({}));

      expect(preventDefault).toHaveBeenCalledTimes(2);
    });
  });
});
