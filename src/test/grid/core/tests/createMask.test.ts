import { createMask } from '../createMask';

import { _Dimension_, _Gap_, _Mask_ } from './mocks';

describe('createMask()', () => {
  it('creates mask for different dimensions', () => {
    const _PROBES_ = [
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 2],
      [4, 4],
      [1, 3],
      [3, 1],
    ];
    const _GAP_ = _Gap_(0, 0);

    _PROBES_.forEach(([rows, cols]) => {
      const _DIMENSION_ = _Dimension_(rows, cols, _GAP_);

      expect(createMask(_DIMENSION_)).toEqual(_Mask_(_DIMENSION_));
    });
  });
});
