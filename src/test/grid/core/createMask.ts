import { Mask, Dimension } from '../models/core';
import { createCell } from './createCell';
import { createCords } from './createCords';
import { createPositiveArray } from '../utils/createPositiveArray';

export const createMask = (dimension: Dimension): Mask => {
  const [rowsArray, colsArray] = [
    createPositiveArray(dimension.rows),
    createPositiveArray(dimension.cols),
  ];

  let idx = 1;
  const mask: Mask = {};

  rowsArray.forEach((row) => {
    colsArray.forEach((col) => {
      const cords = createCords(row, col, dimension);
      mask[idx] = createCell(idx, cords, dimension);
      idx++;
    });
  });

  return mask;
};
