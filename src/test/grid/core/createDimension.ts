import { Dimension, Gap } from '../models/core';

const [MIN_ROWS, MIN_COLS] = [1, 1];

const validate = (rows: number, cols: number): void => {
  if (rows < MIN_ROWS) {
    throw new Error('Invalid rows parameter. Value should be higher than 0');
  }

  if (cols < MIN_COLS) {
    throw new Error('Invalid cols parameter. Value should be higher than 0');
  }
};

export const createDimension = (rows: number, cols: number, gap: Gap): Dimension => {
  validate(rows, cols);

  return {
    rows,
    cols,
    size: rows * cols,
    gap,
  };
};
