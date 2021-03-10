import { Cell, Cells, Mask } from '../models/core';
import { getEdgeItems } from '../utils/getEdgeItems';
import { toNumericArray } from '../utils/toNumericArray';

const validate = (fromId: number, toId: number, mask: Mask, groupId: number): void => {
  if (fromId > toId || !mask[fromId] || !mask[toId]) {
    throw new Error('Cannot find cell in mask');
  }

  if (groupId < 0) {
    throw new Error('Invalid groupId parameter');
  }
};

const createRange = (mask: Mask, from: Cell, to: Cell): number[] => {
  const values = Object.values(mask);

  const range = values.reduce((acc, { id, cords }): number[] => {
    const isInRowRange = cords.row >= from.cords.row && cords.row <= to.cords.row;
    const isInColRange = cords.col >= from.cords.col && cords.col <= to.cords.col;

    return isInRowRange && isInColRange ? [...acc, id] : acc;
  }, [] as number[]);

  return range;
};

export const createCells = (cellsIds: string, mask: Mask, groupId = 0): Cells => {
  const numericCellsIds = toNumericArray(cellsIds.split(','));
  const [fromCellId, toCellId] = getEdgeItems(numericCellsIds);

  validate(fromCellId, toCellId, mask, groupId);

  const from = mask[fromCellId];
  const to = mask[toCellId];

  return {
    from,
    to,
    groupId,
    get range(): number[] {
      return createRange(mask, from, to);
    },
    get stringRange(): string {
      return createRange(mask, from, to).join(',');
    },
  };
};
