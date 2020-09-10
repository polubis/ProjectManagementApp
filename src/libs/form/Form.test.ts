// import { Form } from '.';

// describe('Form', () => {
//   describe('during initialization', () => {
//     it('assigns values', () => {
//       const config = {
//         email: { value: '' },
//         username: { value: '' }
//       };

//       const form = Form(config);

//       expect(form.values.email.value).toBe(config.email.value);
//       expect(form.values.username.value).toBe(config.username.value);
//     });

//     it('validates values on init', () => {
//       const req = (value: string) => value.trim().length === 0;
//       const config = {
//         email: { value: '', fns: [req] },
//         username: { value: '', fns: [] },
//         zipCode: { value: 2 }
//       };

//       const form = Form(config);

//       expect(form.values.email.invalid).toBeTruthy();
//       expect(form.values.username.invalid).toBeFalsy();
//       expect(form.values.zipCode.invalid).toBeFalsy();
//     });
//   });

//   it('updates values', () => {
//     const config = {
//       email: { value: '' },
//       username: { value: '' },
//       zipCode: { value: 2 }
//     };
//     const form = Form(config);

//     (() => {
//       const values = { email: 'siema1994', zipCode: 23 };

//       form.update(values);

//       expect(form.values.email.value).toBe(values.email);
//       expect(form.values.username.value).toBe(config.username.value);
//       expect(form.values.zipCode.value).toBe(values.zipCode);
//     })();

//     (() => {
//       const values = { email: 'siema4', zipCode: 23 };

//       form.update(values);

//       expect(form.values.email.value).toBe(values.email);
//       expect(form.values.username.value).toBe(config.username.value);
//       expect(form.values.zipCode.value).toBe(values.zipCode);
//     })();
//   });

//   it('validates values', () => {
//     const req = (value: string) => value.trim().length === 0;
//     const config = {
//       email: { value: '', fns: [req] },
//       username: { value: '', fns: [] },
//       zipCode: { value: 2 }
//     };
//     const form = Form(config);

//     (() => {
//       form.update({ email: '', zipCode: 23, username: 'piotr1994' });

//       expect(form.values.email.invalid).toBeTruthy();
//       expect(form.values.username.invalid).toBeFalsy();
//       expect(form.values.zipCode.invalid).toBeFalsy();
//     })();

//     (() => {
//       form.update({ email: '194', zipCode: 23, username: 'piotr1994' });

//       expect(form.values.email.invalid).toBeFalsy();
//       expect(form.values.username.invalid).toBeFalsy();
//       expect(form.values.zipCode.invalid).toBeFalsy();
//     })();
//   });
// });

import { Form, Field } from '.';

describe('Field', () => {
  it('creates equal object', () => {
    const values = ['email', 'username', 'code'];

    values.forEach(value => {
      const field = Field(value);
      expect(field).toEqual(Field(value));
    });
  });
});

describe('Form', () => {
  const req = (v: any) => !v;
  const { create } = Form({
    email: Field('', [req]),
    username: Field(''),
    code: Field(2233, [])
  });

  it('creates values', () => {
    const form = create();

    expect(form.fields.email.value).toBe('');
    expect(form.fields.email.fns).toEqual([req]);
    expect(form.fields.email.invalid).toBeTruthy();
    expect(form.fields.username.value).toBe('');
    expect(form.fields.username.fns).toEqual([]);
    expect(form.fields.username.invalid).toBeFalsy();
    expect(form.fields.code.value).toBe(2233);
    expect(form.fields.code.fns).toEqual([]);
    expect(form.fields.code.invalid).toBeFalsy();
  });

  it('sets values', () => {
    const form = create();

    const newForm = form.set({ email: Field('d', []) });

    expect(newForm.fields.email.value).toBe('d');
    expect(newForm.fields.email.fns).toEqual([req]);
    expect(newForm.fields.email.invalid).toBeFalsy();
  });
});
