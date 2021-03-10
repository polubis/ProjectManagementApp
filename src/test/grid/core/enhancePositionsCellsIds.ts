import { Mask, Positions } from '../models/core';
import { enhanceCellsIds } from './enhanceCellsIds';

export const enhancePositionsCellsIds = <T>(mask: Mask, positions: Positions<T>): Positions<T> => {
  return positions.map((position) => ({
    ...position,
    cellsIds: enhanceCellsIds(mask, position.cellsIds),
  }));
};
