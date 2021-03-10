import { Mask, Position, Positions } from '../models/core';
import { getEdgeItems } from '../utils/getEdgeItems';
import { enhanceCellsIds } from './enhanceCellsIds';
import { enhancePositionsCellsIds } from './enhancePositionsCellsIds';

const removeDuplicates = <T>(positions: Positions<T>): Positions<T> => {
  const dictionary = positions.reduce(
    (acc, position): Record<string, Position<T>> => ({
      ...acc,
      [`${position.cellsIds}:${position.groupId}`]: position,
    }),
    {} as Record<string, Position<T>>
  );

  const withoutDuplicates = Object.values(dictionary);

  return withoutDuplicates;
};

export const mergePositions = <T>(
  mask: Mask,
  prev: Positions<T>,
  next: Positions<T>
): Positions<T> => {
  if (!next.length) {
    return [...prev];
  }

  const enhancedPrev = enhancePositionsCellsIds(mask, prev).map((position) => ({
    ...position,
    cellsIds: position.cellsIds.split(','),
  }));
  const enhancedNext = enhancePositionsCellsIds(mask, next).map((position) => ({
    ...position,
    cellsIds: position.cellsIds.split(','),
  }));

  let merged: Positions<T> = [];

  const nextLength = enhancedNext.length;

  for (let i = 0; i < nextLength; i++) {
    const currNext = enhancedNext[i];

    for (let j = 0; j < prev.length; j++) {
      const currPrev = enhancedPrev[j];
      const collision = currPrev.cellsIds.some(
        (cellId) => currPrev.groupId === currNext.groupId && currNext.cellsIds.includes(cellId)
      );

      if (!collision) {
        merged.push({
          ...currPrev,
          cellsIds: getEdgeItems(currPrev.cellsIds).join(','),
        });
      }
    }
  }

  return removeDuplicates([...merged, ...next]);
};
