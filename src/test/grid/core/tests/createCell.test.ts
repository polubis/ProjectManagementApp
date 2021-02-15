import { createCell } from '../createCell';
import { _Cell_, _Cords_, _Dimension_, _Gap_ } from './mocks';

describe('createCell()', () => {
  const _GAP_ = _Gap_(0, 0);
  const _CORDS_ = _Cords_(1, 1);
  const _DIMENSION_ = _Dimension_(2, 2, _GAP_);

  describe('throws an error for invalid', () => {
    it('id', () => {
      expect(() => createCell(-1, _CORDS_, _DIMENSION_)).toThrow();
      expect(() => createCell(0, _CORDS_, _DIMENSION_)).toThrow();
      expect(() => createCell(5, _CORDS_, _DIMENSION_)).toThrow();

      expect(() => createCell(1, _CORDS_, _DIMENSION_)).not.toThrow();
      expect(() => createCell(4, _CORDS_, _DIMENSION_)).not.toThrow();
    });
  });

  it('assigns values', () => {
    expect(createCell(1, _CORDS_, _DIMENSION_)).toEqual(_Cell_(1, _CORDS_));
  });
});
