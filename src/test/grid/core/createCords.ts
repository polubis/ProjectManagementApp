import { Cords, Dimension } from '../models/core';

const [MIN_ROW, MIN_COL] = [1, 1];

const validate = (row: number, col: number, { rows, cols }: Dimension): void => {
  if (row < MIN_ROW) {
    throw new Error('Invalid row parameter. Value should be higher than 0');
  }

  if (col < MIN_COL) {
    throw new Error('Invalid col parameter. Value should be higher than 0');
  }

  if (row > rows) {
    throw new Error(`Invalid row parameter. Value should be lower than ${rows}`);
  }

  if (col > cols) {
    throw new Error(`Invalid col parameter. Value should be lower than ${cols}`);
  }
};

export const createCords = (row: number, col: number, dimension: Dimension): Cords => {
  validate(row, col, dimension);

  return {
    row,
    col,
  };
};
