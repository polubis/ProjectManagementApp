import { FieldBuilder } from '..';

describe('FieldBuilder', () => {
  it('builds field', () => {
    const fieldBuilder = new FieldBuilder('');
    fieldBuilder.create();

    const field = fieldBuilder.get();

    expect(field).toEqual({ fns: [], value: '', invalid: false } as typeof field);
  });

  it('builds validated field', () => {
    const username = 'exmauser';
    const isUsernameInvalid = (v: string) => v.length < 10;
    const fieldBuilder = new FieldBuilder(username, [isUsernameInvalid]);
    fieldBuilder.create();

    const field = fieldBuilder.get();

    expect(field).toEqual({
      fns: [isUsernameInvalid],
      value: username,
      invalid: true
    } as typeof field);
  });
});
