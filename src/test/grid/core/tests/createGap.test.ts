import { createGap } from '../createGap';
import { _Gap_ } from './mocks';

describe('createGap()', () => {
  describe('throws an error for out of range', () => {
    it('rows', () => {
      expect(() => createGap(-1, 1)).toThrow();

      expect(() => createGap(0, 1)).not.toThrow();
      expect(() => createGap(1, 1)).not.toThrow();
      expect(() => createGap(2, 1)).not.toThrow();
    });

    it('cols', () => {
      expect(() => createGap(1, -1)).toThrow();

      expect(() => createGap(1, 0)).not.toThrow();
      expect(() => createGap(1, 1)).not.toThrow();
      expect(() => createGap(1, 2)).not.toThrow();
    });
  });

  it('assigns values', () => {
    expect(createGap(3, 4)).toEqual(_Gap_(3, 4));
  });
});
