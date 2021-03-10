import { useState, useCallback, useMemo } from 'react';
import Grid from './Grid';
import { useGridMask } from './useGridMask';
import { enhancePositions, removeCollisions } from './core';

type UseGridManagement<T = null> = [
  Grid.EnhancedPositions<T>,
  (newPositions: Grid.Positions<T>) => void
];

export const useGridManagement = <T = null>(
  config: Grid.Config,
  initPositions: Grid.Positions<T>
): UseGridManagement<T> => {
  const mask = useGridMask(config);

  const enhancedInitPositions = useMemo(() => enhancePositions(mask, initPositions), [
    mask,
    initPositions,
  ]);

  const [positions, setPositions] = useState<Grid.EnhancedPositions<T>>(enhancedInitPositions);

  const handleSetPositions = useCallback(
    (newPositions: Grid.Positions<T>) => {
      const enhancedNewPositions = enhancePositions(mask, newPositions);

      setPositions(removeCollisions(positions, enhancedNewPositions));
    },
    [mask, positions]
  );

  return [positions, handleSetPositions];
};
