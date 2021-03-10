import { useCallback, useMemo, useState } from 'react';
import { GridConfig, Positions } from '../models/core';
import { createDimension } from './createDimension';
import { createGap } from './createGap';
import { createMask } from './createMask';
import { mergePositions } from './mergePositions';

type UpdatePositions<T> = (newPositions: Positions<T>) => void;

type UsePositions<T> = [Positions<T>, UpdatePositions<T>];

export const usePositions = <T>(
  { rowGap, colGap, rows, cols }: GridConfig,
  initPositions: Positions<T>
): UsePositions<T> => {
  const gap = useMemo(() => createGap(rowGap, colGap), [rowGap, colGap]);
  const dimension = useMemo(() => createDimension(rows, cols, gap), [rows, cols, gap]);
  const mask = useMemo(() => createMask(dimension), [dimension]);
  const [positions, setPositions] = useState(initPositions);

  const updatePositions: UpdatePositions<T> = useCallback(
    (newPositions) => {
      setPositions(mergePositions(mask, positions, newPositions));
    },
    [positions, mask]
  );

  return [positions, updatePositions];
};
