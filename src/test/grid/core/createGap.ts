import { Gap } from '../models/core';

const [MIN_ROWS, MIN_COLS] = [0, 0];

const validate = (rows: number, cols: number): void => {
  if (rows < MIN_ROWS) {
    throw new Error('Invalid rows parameter. Value should be 0 or positive number');
  }

  if (cols < MIN_COLS) {
    throw new Error('Invalid cols parameter. Value should be 0 or positive number');
  }
};

export const createGap = (rows: number, cols: number): Gap => {
  validate(rows, cols);

  return {
    rows,
    cols,
  };
};
