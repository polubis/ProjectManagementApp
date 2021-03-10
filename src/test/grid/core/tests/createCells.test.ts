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
    expect(() => createCells('a, 1', _MASK_, -1)).toThrow();

    expect(() => createCells('1,3', _MASK_, 0)).not.toThrow();
    expect(() => createCells('1,3', _MASK_)).not.toThrow();
    expect(() => createCells('1,1', _MASK_)).not.toThrow();
  });

  it('inits values', () => {
    expect(createCells('1,1', _MASK_).groupId).toBe(0);
    expect(createCells('1,1', _MASK_, 1).groupId).toBe(1);

    expect(createCells('1,1', _MASK_).from).toEqual(_Cell_(1, _Cords_(1, 1)));
    expect(createCells('1,1', _MASK_).to).toEqual(_Cell_(1, _Cords_(1, 1)));

    expect(createCells('1,2', _MASK_).from).toEqual(_Cell_(1, _Cords_(1, 1)));
    expect(createCells('1,2', _MASK_).to).toEqual(_Cell_(2, _Cords_(1, 2)));

    expect(createCells('2,2', _MASK_).from).toEqual(_Cell_(2, _Cords_(1, 2)));
    expect(createCells('2,2', _MASK_).to).toEqual(_Cell_(2, _Cords_(1, 2)));

    expect(createCells('3,3', _MASK_).from).toEqual(_Cell_(3, _Cords_(2, 1)));
    expect(createCells('3,3', _MASK_).to).toEqual(_Cell_(3, _Cords_(2, 1)));

    expect(createCells('4,4', _MASK_).from).toEqual(_Cell_(4, _Cords_(2, 2)));
    expect(createCells('4,4', _MASK_).to).toEqual(_Cell_(4, _Cords_(2, 2)));
  });

  it('allows to read range in between cells', () => {
    const _GAP_ = _Gap_(2, 2);
    const _DIMENSION_ = _Dimension_(3, 4, _GAP_);
    const _MASK_ = _Mask_(_DIMENSION_);

    expect(createCells('1,1', _MASK_).range).toEqual([1]);
    expect(createCells('1,3', _MASK_).range).toEqual([1, 2, 3]);
    expect(createCells('1,9', _MASK_).range).toEqual([1, 5, 9]);
    expect(createCells('2,8', _MASK_).range).toEqual([2, 3, 4, 6, 7, 8]);
    expect(createCells('1,4', _MASK_).range).toEqual([1, 2, 3, 4]);
    expect(createCells('1,5', _MASK_).range).toEqual([1, 5]);
    expect(createCells('4,12', _MASK_).range).toEqual([4, 8, 12]);
    expect(createCells('5, 8', _MASK_).range).toEqual([5, 6, 7, 8]);
    expect(createCells('1,11', _MASK_).range).toEqual([1, 2, 3, 5, 6, 7, 9, 10, 11]);
    expect(createCells('1,12', _MASK_).range).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
});
