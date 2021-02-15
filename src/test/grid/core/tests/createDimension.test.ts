import { createDimension } from '../createDimension';
import { _Gap_ } from './mocks';

describe('createDimension()', () => {
  const _GAP_ = _Gap_(0, 0);

  describe('throws an error for out of range', () => {
    it('rows', () => {
      expect(() => createDimension(-1, 1, _GAP_)).toThrow();
      expect(() => createDimension(0, 1, _GAP_)).toThrow();

      expect(() => createDimension(1, 1, _GAP_)).not.toThrow();
      expect(() => createDimension(2, 1, _GAP_)).not.toThrow();
    });

    it('cols', () => {
      expect(() => createDimension(1, -1, _GAP_)).toThrow();
      expect(() => createDimension(1, 0, _GAP_)).toThrow();

      expect(() => createDimension(1, 1, _GAP_)).not.toThrow();
      expect(() => createDimension(1, 2, _GAP_)).not.toThrow();
    });
  });

  it('assigns values', () => {
    const { rows, cols, gap } = createDimension(2, 3, _GAP_);

    expect(rows).toBe(2);
    expect(cols).toBe(3);
    expect(gap).toBe(_GAP_);
  });

  it('calculates size', () => {
    const { size } = createDimension(2, 3, _GAP_);

    expect(size).toBe(6);
  });
});
