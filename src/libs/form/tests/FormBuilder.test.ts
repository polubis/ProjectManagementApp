import { FormBuilder } from '..';

describe('FormBuilder', () => {
  it('Builds form', () => {
    const fields = {
      email: { value: '', fns: [] },
      username: { value: '', fns: [] }
    };
    const keys = Object.keys(fields) as (keyof typeof fields)[];
    const formBuilder = new FormBuilder(fields, keys);
    formBuilder.create();

    const form = formBuilder.get();

    expect(form.fields).toEqual(fields);
    expect(form.keys).toEqual(keys);
  });
});
