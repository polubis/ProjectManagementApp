import { Dimension, Cords, Cell, Mask, GridStyle, Gap } from '../../models/core';
import { createPositiveArray } from '../../utils/createPositiveArray';

export const _Gap_ = (rows: number, cols: number): Gap => {
  return {
    rows,
    cols,
  };
};

export const _Dimension_ = (rows: number, cols: number, gap: Gap): Dimension => {
  return {
    rows,
    cols,
    size: rows * cols,
    gap,
  };
};

export const _Cords_ = (row: number, col: number): Cords => {
  return {
    row,
    col,
  };
};

export const _Cell_ = (id: number, cords: Cords): Cell => {
  return {
    id,
    cords,
  };
};

export const _Mask_ = (dimension: Dimension): Mask => {
  const [rowsArray, colsArray] = [
    createPositiveArray(dimension.rows),
    createPositiveArray(dimension.cols),
  ];

  let idx = 1;
  const mask: Mask = {};

  rowsArray.forEach((row) => {
    colsArray.forEach((col) => {
      const cords = _Cords_(row, col);
      mask[idx] = _Cell_(idx, cords);
      idx++;
    });
  });

  return mask;
};

export const _GridStyle_ = (
  { rows, cols, gap }: Dimension,
  rowsCreator = () => '1fr',
  colsCreator = () => '1fr'
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
