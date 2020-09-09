import { KeysBuilder } from '..';

describe('KeysBuilder', () => {
  it('creates Keys object', () => {
    const obj = {
      email: '',
      username: ''
    };
    const keysBuilder = new KeysBuilder(obj);
    keysBuilder.create();
    
    const keys = keysBuilder.get();

    expect(keys).toEqual(['email', 'username'] as (keyof typeof obj)[]);
  });
});
