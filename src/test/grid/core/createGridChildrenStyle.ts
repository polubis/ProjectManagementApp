import { Cells, GridChildrenStyle } from '../models/core';

export const createGridChildrenStyle = ({ from, to }: Cells): GridChildrenStyle => {
  const gridRowFrom = from.cords.row;
  const gridRowTo = gridRowFrom !== to.cords.row ? to.cords.row + 1 : to.cords.row;
  const gridRow = `${gridRowFrom}/${gridRowTo}`;

  const gridColFrom = from.cords.col;
  const gridColTo = gridColFrom !== to.cords.col ? to.cords.col + 1 : to.cords.col;
  const gridColumn = `${gridColFrom}/${gridColTo}`;

  return { gridRow, gridColumn };
};
