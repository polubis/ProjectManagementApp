import { FormBuilder, Field } from './form-builder';

// TDD
describe('Value', () => {
  it('creates value object', () => {
    // ARRANGE
    const [value, validators] = ['', []];

    // ACT
    const field = new Field(value, validators);

    // ASSERT
    expect(field).toEqual({ invalid: false, value, validators } as Field<typeof value>);
  });
});

describe('FormBuilder', () => {
  const req = <T>(value: T): boolean => !value;
  const minLength = (ln: number) => (value: string | any[]): boolean => value.length < ln;

  it('creates fields property', () => {
    // ARRANGE
    const config = {
      email: new Field('', [req, minLength(2)]),
      phoneNumber: new Field(223224112, [req]),
      username: new Field('dsd', [req]),
      zipCode: new Field(1223)
    };

    // ACT
    const form = new FormBuilder(config);

    // ASSERT
    expect(form.fields).toEqual({
      email: {
        ...config.email,
        invalid: true
      },
      phoneNumber: {
        ...config.phoneNumber,
        invalid: false
      },
      username: {
        ...config.username,
        invalid: false
      },
      zipCode: {
        ...config.zipCode,
        invalid: false
      }
    } as typeof config);
  });

  it('extracts keys from config', () => {
    const config = {
      email: new Field(''),
      username: new Field('')
    };

    const form = new FormBuilder(config);

    expect(form.keys).toEqual(['email', 'username'] as (keyof typeof config)[]);
  });

  it('updates values', () => {
    const config = {
      email: new Field(''),
      username: new Field('')
    };
    const email = 'exampleuser@gmail.com';
    const username = 'example-user';

    const form = new FormBuilder(config);
    form.update({ email, username });

    expect(form.fields.email.value).toBe(email);
    expect(form.fields.username.value).toBe(username);
  });

  it('validates values', () => {
    const config = {
      email: new Field('', [req]),
      username: new Field('', [req])
    };
    const username = 'example-user';

    const form = new FormBuilder(config);
    form.update({ username });

    expect(form.fields.email.invalid).toBeTruthy();
    expect(form.fields.username.invalid).toBeFalsy();
  });
});
