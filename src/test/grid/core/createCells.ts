import { Cells, Mask } from '../models/core';
import { getEdgeItems } from '../utils/getEdgeItems';
import { toNumericArray } from '../utils/toNumericArray';

const validate = (fromCellId: number, toCellId: number, mask: Mask): void => {
  if (fromCellId > toCellId) {
    throw new Error(
      'Invalid parameters. Attribute fromCellId must have same or lower value than toCellId'
    );
  }

  if (!mask[fromCellId]) {
    throw new Error('Invalid fromCellId value. Cannot find cell in mask');
  }

  if (!mask[toCellId]) {
    throw new Error('Invalid toCellId value. Cannot find cell in mask');
  }
};

export const createCells = (cellsIds: string, mask: Mask): Cells => {
  const numericCellsIds = toNumericArray(cellsIds.split(','));
  const [fromCellId, toCellId] = getEdgeItems(numericCellsIds);

  validate(fromCellId, toCellId, mask);

  return {
    from: mask[fromCellId],
    to: mask[toCellId],
  };
};
