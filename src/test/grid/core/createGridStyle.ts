import { Dimension, GridStyle, RowsCreator, ColsCreator } from '../models/core';
import { createPositiveArray } from '../utils/createPositiveArray';

const createRows: RowsCreator = () => '1fr';
const createCols: ColsCreator = () => '1fr';

export const createGridStyle = (
  { rows, cols, gap }: Dimension,
  rowsCreator = createRows,
  colsCreator = createCols
): GridStyle => {
  const gridTemplateRows = createPositiveArray(rows).map(rowsCreator).join(' ');
  const gridTemplateColumns = createPositiveArray(cols).map(colsCreator).join(' ');

  return {
    display: 'grid',
    position: 'relative',
    gap: `${gap.rows}px ${gap.cols}px`,
    gridTemplateRows,
    gridTemplateColumns,
  };
};
