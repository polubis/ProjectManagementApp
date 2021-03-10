import { Positions, GridConfig } from '../../models/core';
import { createDimension } from '../createDimension';
import { createGap } from '../createGap';
import { createMask } from '../createMask';
import { enhancePositionsCellsIds } from '../enhancePositionsCellsIds';

describe('enhancePositionsCellsIds()', () => {
  it('enhances positions', () => {
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
    const _POSITIONS_: Positions = [
      { cellsIds: '1,3', groupId: 0 },
      { cellsIds: '4,8', groupId: 0 },
      { cellsIds: '5,7', groupId: 1 },
      { cellsIds: '9,10', groupId: 0 },
      { cellsIds: '11,12', groupId: 0 },
    ];

    const result = enhancePositionsCellsIds(_MASK_, _POSITIONS_);

    expect(result[0].cellsIds).toBe('1,2,3');
    expect(result[1].cellsIds).toBe('4,8');
    expect(result[2].cellsIds).toBe('5,6,7');
    expect(result[3].cellsIds).toBe('9,10');
    expect(result[4].cellsIds).toBe('11,12');
  });
});
