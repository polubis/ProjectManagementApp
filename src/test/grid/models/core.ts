import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

export interface Gap {
  rows: number;
  cols: number;
}

export interface Dimension {
  rows: number;
  cols: number;
  size: number;
  gap: Gap;
}

export interface Cords {
  row: number;
  col: number;
}

export interface Cell {
  id: number;
  cords: Cords;
}

export type Mask = Record<number, Cell>;

export interface GridStyle {
  display: 'grid';
  position: 'relative';
  gap: string;
  gridTemplateRows: string;
  gridTemplateColumns: string;
}

export type RowsCreator = (acc: number) => string;
export type ColsCreator = (acc: number) => string;

export interface Cells {
  from: Cell;
  to: Cell;
}

export interface GridChildrenStyle {
  gridColumn: string;
  gridRow: string;
}

export type EnhancedGridChildren = ReactElement<{ style: GridChildrenStyle }>;

export interface GridProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
  children: ReactElement | ReactElement[];
  rows: number;
  cols: number;
  rowGap?: number;
  colGap?: number;
  rowsCreator?: RowsCreator;
  colsCreator?: ColsCreator;
}

export interface GridItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cellsIds: string;
}
