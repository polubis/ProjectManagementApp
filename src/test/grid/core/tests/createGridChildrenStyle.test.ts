import { createGridChildrenStyle } from '../createGridChildrenStyle';
import { createCells } from '../createCells';
import { createMask } from '../createMask';
import { createGap } from '../createGap';
import { createDimension } from '../createDimension';
import { GridChildrenStyle } from '../../models/core';

describe('createGridChildrenStyle()', () => {
  const _GAP_ = createGap(0, 0);
  const _DIMENSION_ = createDimension(3, 3, _GAP_);
  const _MASK_ = createMask(_DIMENSION_);

  describe('creates style', () => {
    const _Result_ = (gridRow: string, gridColumn: string): GridChildrenStyle => ({
      gridRow,
      gridColumn,
    });

    it('for equal cells ids', () => {
      expect(createGridChildrenStyle(createCells('1,1', _MASK_))).toEqual(_Result_('1/1', '1/1'));
      expect(createGridChildrenStyle(createCells('2,2', _MASK_))).toEqual(_Result_('1/1', '2/2'));
      expect(createGridChildrenStyle(createCells('3,3', _MASK_))).toEqual(_Result_('1/1', '3/3'));
      expect(createGridChildrenStyle(createCells('4,4', _MASK_))).toEqual(_Result_('2/2', '1/1'));
      expect(createGridChildrenStyle(createCells('5,5', _MASK_))).toEqual(_Result_('2/2', '2/2'));
      expect(createGridChildrenStyle(createCells('6,6', _MASK_))).toEqual(_Result_('2/2', '3/3'));
      expect(createGridChildrenStyle(createCells('7,7', _MASK_))).toEqual(_Result_('3/3', '1/1'));
      expect(createGridChildrenStyle(createCells('8,8', _MASK_))).toEqual(_Result_('3/3', '2/2'));
      expect(createGridChildrenStyle(createCells('9,9', _MASK_))).toEqual(_Result_('3/3', '3/3'));
    });

    it('for different cells ids', () => {
      expect(createGridChildrenStyle(createCells('1,2', _MASK_))).toEqual(_Result_('1/1', '1/3'));
      expect(createGridChildrenStyle(createCells('1,3', _MASK_))).toEqual(_Result_('1/1', '1/4'));
      expect(createGridChildrenStyle(createCells('1,9', _MASK_))).toEqual(_Result_('1/4', '1/4'));
      expect(createGridChildrenStyle(createCells('3,6', _MASK_))).toEqual(_Result_('1/3', '3/3'));
      expect(createGridChildrenStyle(createCells('2,8', _MASK_))).toEqual(_Result_('1/4', '2/2'));
      expect(createGridChildrenStyle(createCells('4,6', _MASK_))).toEqual(_Result_('2/2', '1/4'));
      expect(createGridChildrenStyle(createCells('4,5', _MASK_))).toEqual(_Result_('2/2', '1/3'));
    });
  });
});
