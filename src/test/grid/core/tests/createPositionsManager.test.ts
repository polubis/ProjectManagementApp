import { Position, Positions } from '../../models/core';
import { createPositionsManager } from '../createPositionsManager';
import { _Gap_, _Cords_, _Dimension_, _Mask_ } from './mocks';

describe('createPositionsManager()', () => {
  interface Data {
    id: number;
  }

  const _GAP_ = _Gap_(0, 0);
  const _DIMENSION_ = _Dimension_(3, 4, _GAP_);
  const _MASK_ = _Mask_(_DIMENSION_);
  const _POSITION_: Position<Data> = { id: 0, groupId: 0, cellsIds: '1,1', data: { id: 0 } };
  // 1 2 3 4
  // 5 6 7 8
  // 9 10 11 12
  // x x x x
  // x x x x
  // x x x x
  const _POSITIONS_: Positions<Data> = [
    { id: 0, cellsIds: '1,1', groupId: 0, data: { id: 0 } },
    { id: 1, cellsIds: '2,4', groupId: 1, data: { id: 1 } },
    { id: 2, cellsIds: '5,8', groupId: 1, data: { id: 2 } },
    { id: 3, cellsIds: '9,9', groupId: 0, data: { id: 3 } },
    { id: 4, cellsIds: '10', groupId: 2, data: { id: 4 } },
    { id: 5, cellsIds: '11', groupId: 0, data: { id: 5 } },
    { id: 6, cellsIds: '12', groupId: 0, data: { id: 6 } },
  ];

  describe('on init', () => {
    it('assigns values', () => {
      expect(createPositionsManager([_POSITION_], _MASK_).values).toEqual([_POSITION_]);
    });

    it('creates dictionary on value assign', () => {
      expect(createPositionsManager([_POSITION_], _MASK_).dictionary).toEqual({
        '1,1': _POSITION_,
      });
    });

    describe('throws an error', () => {
      it('for values with collisions', () => {
        expect(() =>
          createPositionsManager(
            [..._POSITIONS_, { ..._POSITION_, cellsIds: '2,6', groupId: 1 }],
            _MASK_
          )
        ).toThrow();
        expect(() =>
          createPositionsManager([..._POSITIONS_, { ..._POSITION_, cellsIds: '2,6' }], _MASK_)
        ).not.toThrow();
      });
    });
  });

  it('checks collisions', () => {
    expect(createPositionsManager(_POSITIONS_, _MASK_).checkHasCollision(_POSITIONS_)).toBe(false);
    expect(
      createPositionsManager(_POSITIONS_, _MASK_).checkHasCollision([..._POSITIONS_, _POSITION_])
    ).toBe(true);
    expect(
      createPositionsManager(_POSITIONS_, _MASK_).checkHasCollision([
        ..._POSITIONS_,
        { ..._POSITION_, cellsIds: '1' },
      ])
    ).toBe(true);
    expect(
      createPositionsManager(_POSITIONS_, _MASK_).checkHasCollision([
        ..._POSITIONS_,
        { ..._POSITION_, cellsIds: '1,1,1' },
      ])
    ).toBe(true);
    expect(
      createPositionsManager(_POSITIONS_, _MASK_).checkHasCollision([
        ..._POSITIONS_,
        { ..._POSITION_, groupId: 3 },
      ])
    ).toBe(false);
    expect(
      createPositionsManager(_POSITIONS_, _MASK_).checkHasCollision([
        ..._POSITIONS_,
        { ..._POSITION_, groupId: 3 },
      ])
    ).toBe(false);
    expect(
      createPositionsManager(_POSITIONS_, _MASK_).checkHasCollision([
        ..._POSITIONS_,
        { ..._POSITION_, cellsIds: '2,6', groupId: 1 },
      ])
    ).toBe(true);
    expect(
      createPositionsManager(_POSITIONS_, _MASK_).checkHasCollision([
        ..._POSITIONS_,
        { ..._POSITION_, cellsIds: '2,6', groupId: 3 },
      ])
    ).toBe(false);
    expect(
      createPositionsManager(_POSITIONS_, _MASK_).checkHasCollision([
        ..._POSITIONS_,
        { ..._POSITION_, cellsIds: '1,9' },
      ])
    ).toBe(true);
  });
});
