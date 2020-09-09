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
    const fields = {
      email: new Field('', [req, minLength(2)]),
      phoneNumber: new Field(223224112, [req]),
      username: new Field('dsd', [req]),
      zipCode: new Field(1223)
    };

    // ACT
    const form = new FormBuilder(fields);

    // ASSERT
    expect(form.fields).toEqual({
      email: {
        ...fields.email,
        invalid: true
      },
      phoneNumber: {
        ...fields.phoneNumber,
        invalid: false
      },
      username: {
        ...fields.username,
        invalid: false
      },
      zipCode: {
        ...fields.zipCode,
        invalid: false
      }
    } as typeof fields);
  });

  it('extracts keys from fields', () => {
    const fields = {
      email: new Field(''),
      username: new Field('')
    };

    const form = new FormBuilder(fields);

    expect(form.keys).toEqual(['email', 'username'] as (keyof typeof fields)[]);
  });

  it('updates values', () => {
    const fields = {
      email: new Field(''),
      username: new Field('')
    };
    const email = 'exampleuser@gmail.com';
    const username = 'example-user';

    const form = new FormBuilder(fields);
    form.update({ email, username });

    expect(form.fields.email.value).toBe(email);
    expect(form.fields.username.value).toBe(username);
  });

  it('validates values', () => {
    const fields = {
      email: new Field('', [req]),
      username: new Field('', [req])
    };
    const username = 'example-user';

    const form = new FormBuilder(fields);
    form.update({ username });

    expect(form.fields.email.invalid).toBeTruthy();
    expect(form.fields.username.invalid).toBeFalsy();
  });
});
