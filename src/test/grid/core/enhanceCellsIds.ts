import { Cell, Mask } from '../models/core';
import { getEdgeItems } from '../utils/getEdgeItems';
import { toNumericArray } from '../utils/toNumericArray';

const isInRange = (from: Cell, to: Cell, cell: Cell): boolean => {
  return (
    cell.cords.row >= from.cords.row &&
    cell.cords.col >= from.cords.col &&
    cell.cords.row <= to.cords.row &&
    cell.cords.col <= to.cords.col
  );
};

export const enhanceCellsIds = (mask: Mask, cellsIds: string): string => {
  const [fromCellId, toCellId] = toNumericArray(getEdgeItems(cellsIds.split(',')));

  const entries = Object.entries(mask);

  const from = mask[fromCellId];
  const to = mask[toCellId];

  const filteredEntries = entries.filter(([_, cell]) => isInRange(from, to, cell));

  return filteredEntries.map(([id]) => id).join(',');
};
