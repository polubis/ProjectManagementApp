import { toNumericArray } from '../toNumericArray';

describe('toNumericArray()', () => {
  it('throws an error for NaN item after conversion', () => {
    expect(() => toNumericArray(['1', 'boolean'])).toThrow();

    expect(() => toNumericArray(['1', 2])).not.toThrow();
  });

  it('converts to numeric array', () => {
    expect(toNumericArray(['1', '2'])).toEqual([1, 2]);
    expect(toNumericArray(['1', 2])).toEqual([1, 2]);
  });
});
