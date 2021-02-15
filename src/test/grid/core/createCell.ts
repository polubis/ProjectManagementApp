import { Cell, Cords, Dimension } from '../models/core';

const MIN_ID = 1;

const validate = (id: number, { size }: Dimension) => {
  if (id < MIN_ID) {
    throw new Error('Invalid id parameter. Value should be higher than 0');
  }

  if (id > size) {
    throw new Error(`Invalid id parameter. Value should be lower than ${size}`);
  }
};

export const createCell = (id: number, cords: Cords, dimension: Dimension): Cell => {
  validate(id, dimension);

  return { id, cords };
};
