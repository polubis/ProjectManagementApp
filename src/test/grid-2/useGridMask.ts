import Grid from './Grid';
import { createPositiveArray } from './utils';
import { useMemo } from 'react';

const createMask = ({ rowsCount, columnsCount }: Grid.Config): Grid.Mask => {
  const [rowsArray, colsArray] = [
    createPositiveArray(rowsCount),
    createPositiveArray(columnsCount),
  ];

  let id = 1;
  const mask: Grid.Mask = {};

  rowsArray.forEach((row) => {
    colsArray.forEach((column) => {
      mask[id] = { id, cords: { row, column } } as Grid.Cell;
      id++;
    });
  });

  return mask;
};

export const useGridMask = (config: Grid.Config): Grid.Mask => {
  const mask = useMemo(() => createMask(config), [config]);

  return mask;
};
