import { GridConfig } from '../../models/core';

import { createDimension } from '../createDimension';
import { createGap } from '../createGap';
import { createMask } from '../createMask';
import { enhanceCellsIds } from '../enhanceCellsIds';

describe('enhanceCellsIds()', () => {
  it('adds all cells ids between', () => {
    const _CONFIG_: GridConfig = {
      rows: 3,
      cols: 4,
      rowGap: 24,
      colGap: 24,
      rowsCreator: () => '1fr',
      colsCreator: () => '1fr',
    };
    const _GAP_ = createGap(_CONFIG_.rowGap, _CONFIG_.colGap);
    const _DIMENSION_ = createDimension(_CONFIG_.rows, _CONFIG_.cols, _GAP_);
    const _MASK_ = createMask(_DIMENSION_);

    expect(enhanceCellsIds(_MASK_, '4,12')).toBe('4,8,12');
    expect(enhanceCellsIds(_MASK_, '4,8')).toBe('4,8');
    expect(enhanceCellsIds(_MASK_, '4')).toBe('4');
  });
});
