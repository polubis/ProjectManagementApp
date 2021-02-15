import { createPositiveArray } from '../createPositiveArray';

describe('PositivcreatePositiveArrayeArray()', () => {
  it('creates positive numbers array', () => {
    expect(createPositiveArray(3)).toEqual([1, 2, 3]);
    expect(createPositiveArray(0)).toEqual([]);
  });
});
