import { createCells } from '../createCells';
import { _Cell_, _Cords_, _Dimension_, _Gap_, _Mask_ } from './mocks';

describe('createCells()', () => {
  const _GAP_ = _Gap_(2, 2);
  const _DIMENSION_ = _Dimension_(2, 2, _GAP_);
  const _MASK_ = _Mask_(_DIMENSION_);

  it('throws an error for invalid cells ids', () => {
    expect(() => createCells('2,1', _MASK_)).toThrow();
    expect(() => createCells('3,1', _MASK_)).toThrow();
    expect(() => createCells('1,0', _MASK_)).toThrow();
    expect(() => createCells('0,1', _MASK_)).toThrow();
    expect(() => createCells('1,a', _MASK_)).toThrow();
    expect(() => createCells('a, 1', _MASK_)).toThrow();

    expect(() => createCells('1,1', _MASK_)).not.toThrow();
  });

  it('inits values', () => {
    expect(createCells('1,1', _MASK_)).toEqual({
      from: _Cell_(1, _Cords_(1, 1)),
      to: _Cell_(1, _Cords_(1, 1)),
    });
    expect(createCells('1,2', _MASK_)).toEqual({
      from: _Cell_(1, _Cords_(1, 1)),
      to: _Cell_(2, _Cords_(1, 2)),
    });
    expect(createCells('2,2', _MASK_)).toEqual({
      from: _Cell_(2, _Cords_(1, 2)),
      to: _Cell_(2, _Cords_(1, 2)),
    });
    expect(createCells('3,3', _MASK_)).toEqual({
      from: _Cell_(3, _Cords_(2, 1)),
      to: _Cell_(3, _Cords_(2, 1)),
    });
    expect(createCells('4,4', _MASK_)).toEqual({
      from: _Cell_(4, _Cords_(2, 2)),
      to: _Cell_(4, _Cords_(2, 2)),
    });
  });
});
