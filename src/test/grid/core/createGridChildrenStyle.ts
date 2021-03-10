import { Cells, GridChildrenStyle } from '../models/core';

const validate = (groupId: number): void => {
  if (groupId < 0) {
    throw new Error('Invalid groupId parameter. Value should be 0 or positive number');
  }
};

export const createGridChildrenStyle = ({ from, to }: Cells, groupId = 0): GridChildrenStyle => {
  validate(groupId);

  const gridRowFrom = from.cords.row;
  const gridRowTo = gridRowFrom !== to.cords.row ? to.cords.row + 1 : to.cords.row;
  const gridRow = `${gridRowFrom}/${gridRowTo}`;

  const gridColFrom = from.cords.col;
  const gridColTo = gridColFrom !== to.cords.col ? to.cords.col + 1 : to.cords.col;
  const gridColumn = `${gridColFrom}/${gridColTo}`;

  return { gridRow, gridColumn, zIndex: groupId };
};
