import { KeysBuilder, Form, Field, FieldsBuilder } from './form-builder';

// TDD
const req = <T>(value: T): boolean => !value;
const minLength = (ln: number) => (value: string | any[]): boolean => value.length < ln;

describe('Field', () => {
  it('creates value object', () => {
    // ARRANGE
    const [value, validators] = ['', []];

    // ACT
    const field = new Field(value, validators);

    // ASSERT
    expect(field).toEqual({ invalid: false, value, validators } as Field<typeof value>);
  });
});

describe('KeysBuilder', () => {
  it('builds keys', () => {
    const fields = {
      email: new Field(''),
      username: new Field('')
    };

    expect(new KeysBuilder(fields).build()).toEqual([
      'email',
      'username'
    ] as (keyof typeof fields)[]);
  });
});

describe('FieldsBuilder', () => {
  it('build fields', () => {
    const fields = {
      email: new Field(''),
      username: new Field('')
    };

    expect(new FieldsBuilder(fields, new KeysBuilder(fields).build()).build()).toEqual(fields);
  });

  it('build validates fields', () => {
    const fields = {
      email: new Field('', [req]),
      username: new Field('')
    };

    const fieldsBuilder = new FieldsBuilder(fields, new KeysBuilder(fields).build());
    const newFields = fieldsBuilder.build();

    expect(newFields.email.invalid).toBeTruthy();
    expect(newFields.username.invalid).toBeFalsy();
  });
});

describe('Form', () => {
  it('creates fields property', () => {
    // ARRANGE
    const fields = {
      email: new Field('', [req, minLength(2)]),
      phoneNumber: new Field(223224112, [req]),
      username: new Field('dsd', [req]),
      zipCode: new Field(1223)
    };

    // ACT
    const form = new Form(fields);

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

    const form = new Form(fields);

    expect(form.keys).toEqual(['email', 'username'] as (keyof typeof fields)[]);
  });

  it('updates values', () => {
    const fields = {
      email: new Field(''),
      username: new Field('')
    };
    const email = 'exampleuser@gmail.com';
    const username = 'example-user';

    const form = new Form(fields).update({ email, username });

    expect(form.fields.email.value).toBe(email);
    expect(form.fields.username.value).toBe(username);
  });

  it('validates values', () => {
    const fields = {
      email: new Field('', [req]),
      username: new Field('', [req])
    };
    const username = 'example-user';

    const form = new Form(fields).update({ username });

    expect(form.fields.email.invalid).toBeTruthy();
    expect(form.fields.username.invalid).toBeFalsy();
  });
});

// MOVE TO FORM BUILDER PATTERN

// const keysBuilder = new KeysBuilder(fields); DONE
// const fieldsBuilder = new FieldsBuilder(fields); DONE
// const formBuilder = new FormBuilder(keysBuilder, fieldsBuilder)
// formBuilder.build();
