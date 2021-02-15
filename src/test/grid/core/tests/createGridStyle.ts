import { createGridStyle } from '../createGridStyle';
import { _Dimension_, _Gap_, _GridStyle_ } from './mocks';

describe('createGridStyle()', () => {
  const _GAP_ = _Gap_(0, 0);

  describe('creates style', () => {
    it('with custom creators', () => {
      expect(
        createGridStyle(
          _Dimension_(3, 4, _GAP_),
          () => '250px',
          () => '250px'
        )
      ).toEqual(
        _GridStyle_(
          _Dimension_(3, 4, _GAP_),
          () => '250px',
          () => '250px'
        )
      );
    });

    it('without creators', () => {
      expect(createGridStyle(_Dimension_(3, 4, _GAP_))).toEqual(
        _GridStyle_(_Dimension_(3, 4, _GAP_))
      );
    });
  });
});
