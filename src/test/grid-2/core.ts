import Grid from './Grid';
import { toNumericArray, getEdgeItems } from './utils';

export const isCellInRange = (from: Grid.Cell, to: Grid.Cell, cell: Grid.Cell): boolean => {
  return (
    cell.cords.row >= from.cords.row &&
    cell.cords.column >= from.cords.column &&
    cell.cords.row <= to.cords.row &&
    cell.cords.column <= to.cords.column
  );
};

export const enhanceCellsIds = (mask: Grid.Mask, cellsIds: string): string => {
  const [fromCellId, toCellId] = toNumericArray(getEdgeItems(cellsIds.split(',')));

  const entries = Object.entries(mask);

  const from = mask[fromCellId];
  const to = mask[toCellId];

  const filteredEntries = entries.filter(([_, cell]) => isCellInRange(from, to, cell));

  return filteredEntries.map(([id]) => id).join(',');
};

export const enhancePositions = <T = null>(
  mask: Grid.Mask,
  positions: Grid.Positions<T>
): Grid.EnhancedPositions<T> => {
  const enhancedPositions = positions.map(
    (position): Grid.EnhancedPosition<T> => ({
      ...position,
      groupId: position.groupId ?? 0,
      enhancedCellsIds: enhanceCellsIds(mask, position.cellsIds).split(','),
    })
  );

  return enhancedPositions;
};

export const removeCollisions = <T>(
  currEnhancedPositions: Grid.EnhancedPositions<T>,
  nextEnhancedPositions: Grid.EnhancedPositions<T>
): Grid.EnhancedPositions<T> => {
  const filtered = currEnhancedPositions.filter((currPosition) => {
    const hasCollision = nextEnhancedPositions.some(
      (nextPos) =>
        nextPos.groupId === currPosition.groupId &&
        currPosition.enhancedCellsIds.some((cellId) => nextPos.enhancedCellsIds.includes(cellId))
    );

    return !hasCollision;
  });

  return [...filtered, ...nextEnhancedPositions];
};
