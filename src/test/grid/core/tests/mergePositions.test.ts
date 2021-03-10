import { Mask, Positions } from '../../models/core';
import { mergePositions } from '../mergePositions';

describe('mergePosiitons()', () => {
  it('merges positions', () => {
    // SIZE: 3X4
    // 1, 2, 3, 4,
    // 5, 6, 7, 8,
    // 9, 10, 11, 12
    const _MASK_: Mask = {
      1: { id: 1, cords: { row: 1, col: 1 } },
      2: { id: 2, cords: { row: 1, col: 2 } },
      3: { id: 3, cords: { row: 1, col: 3 } },
      4: { id: 4, cords: { row: 1, col: 4 } },
      5: { id: 5, cords: { row: 2, col: 1 } },
      6: { id: 6, cords: { row: 2, col: 2 } },
      7: { id: 7, cords: { row: 2, col: 3 } },
      8: { id: 8, cords: { row: 2, col: 4 } },
      9: { id: 9, cords: { row: 3, col: 1 } },
      10: { id: 10, cords: { row: 3, col: 2 } },
      11: { id: 11, cords: { row: 3, col: 3 } },
      12: { id: 12, cords: { row: 3, col: 4 } },
    };

    const _POSITIONS_: Positions = [
      { cellsIds: '1,3', groupId: 0 },
      { cellsIds: '4,8', groupId: 0 },
      { cellsIds: '5,7', groupId: 1 },
      { cellsIds: '9,10', groupId: 0 },
      { cellsIds: '11,12', groupId: 0 },
    ];

    expect(mergePositions(_MASK_, _POSITIONS_, []).length).toEqual(_POSITIONS_.length);

    // expect(
    //   mergePositions(_MASK_, _POSITIONS_, [
    //     { cellsIds: '1,3', groupId: 1 },
    //     { cellsIds: '4,8', groupId: 1 },
    //     { cellsIds: '5,7', groupId: 0 },
    //   ]).length
    // ).toEqual(_POSITIONS_.length + 3);

    // expect(
    //   mergePositions(_MASK_, _POSITIONS_, [
    //     { cellsIds: '1,3', groupId: 0 },
    //     { cellsIds: '4,8', groupId: 0 },
    //     { cellsIds: '5,7', groupId: 1 },
    //   ]).length
    // ).toEqual(_POSITIONS_.length + 3);

    // expect(
    //   mergePositions(_MASK_, _POSITIONS_, [
    //     { cellsIds: '1,3', groupId: 0 },
    //     { cellsIds: '4,8', groupId: 0 },
    //     { cellsIds: '5,7', groupId: 1 },
    //   ])
    // ).toEqual([
    //   { cellsIds: '9,10', groupId: 0 },
    //   { cellsIds: '11,12', groupId: 0 },
    //   { cellsIds: '1,3', groupId: 0 },
    //   { cellsIds: '4,8', groupId: 0 },
    //   { cellsIds: '5,7', groupId: 1 },
    // ] as Positions);

    // expect(
    //   mergePositions(_MASK_, _POSITIONS_, [
    //     { cellsIds: '4,8', groupId: 0 },
    //     { cellsIds: '5,10', groupId: 0 },
    //   ])
    // ).toEqual([
    //   { cellsIds: '1,3', groupId: 0 },
    //   { cellsIds: '11,12', groupId: 0 },
    // ] as Positions);

    // expect(
    //   mergePositions(_MASK_, _POSITIONS_, [
    //     { cellsIds: '4,8', groupId: 0 },
    //     { cellsIds: '5,10', groupId: 0 },
    //   ])
    // ).toEqual([
    //   { cellsIds: '1,3', groupId: 0 },
    //   { cellsIds: '11,12', groupId: 0 },
    // ] as Positions);
  });
});
