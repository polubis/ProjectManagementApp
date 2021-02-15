import { createCords } from '../createCords';
import { _Dimension_, _Gap_ } from './mocks';

describe('createCords()', () => {
  const _GAP_ = _Gap_(0, 0);
  const _DIMENSION_ = _Dimension_(2, 2, _GAP_);

  describe('throws and error for out of range', () => {
    it('row', () => {
      expect(() => createCords(0, 1, _DIMENSION_)).toThrow();
      expect(() => createCords(-1, 1, _DIMENSION_)).toThrow();
      expect(() => createCords(3, 1, _DIMENSION_)).toThrow();

      expect(() => createCords(1, 1, _DIMENSION_)).not.toThrow();
      expect(() => createCords(2, 1, _DIMENSION_)).not.toThrow();
    });

    it('col', () => {
      expect(() => createCords(1, 0, _DIMENSION_)).toThrow();
      expect(() => createCords(1, -1, _DIMENSION_)).toThrow();
      expect(() => createCords(1, 3, _DIMENSION_)).toThrow();

      expect(() => createCords(1, 1, _DIMENSION_)).not.toThrow();
      expect(() => createCords(1, 2, _DIMENSION_)).not.toThrow();
    });
  });

  it('assigns values', () => {
    const { row, col } = createCords(1, 2, _DIMENSION_);

    expect(row).toBe(1);
    expect(col).toBe(2);
  });
});
