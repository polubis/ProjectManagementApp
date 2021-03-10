import React, {
  FC,
  useMemo,
  CSSProperties,
  DetailedHTMLProps,
  Children,
  ReactElement,
  cloneElement,
  ReactNode,
} from 'react';

import { createPositiveArray } from './utils';
import { useGridMask } from './useGridMask';

namespace Grid {
  export interface Config {
    rowsCount: number;
    columnsCount: number;
    rowsGap?: number;
    columnsGap?: number;
    rowsHeightCreator?: (iteration: number) => string;
    columnsWidthCreator?: (iteration: number) => string;
  }

  export interface Position<T = null> {
    cellsIds: string;
    groupId?: number;
    data: T | null;
  }

  export type Positions<T> = Position<T>[];

  export interface EnhancedPosition<T = null> {
    cellsIds: string;
    enhancedCellsIds: string[];
    groupId: number;
    data: T | null;
  }

  export type EnhancedPositions<T = null> = EnhancedPosition<T>[];

  export interface Cords {
    row: number;
    column: number;
  }

  export interface Cell {
    id: number;
    cords: Cords;
  }

  export interface Cells {
    from: Cell;
    to: Cell;
  }

  export type Mask = Record<number, Cell>;

  export interface ChildrenProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    cellsIds: string;
    zIndexOnResize?: number;
    resizing?: boolean;
    groupId?: number;
  }

  export interface Props
    extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    config: Config;
  }
}

const createGridStyle = ({
  rowsCount,
  columnsCount,
  rowsGap,
  columnsGap,
  rowsHeightCreator,
  columnsWidthCreator,
}: Grid.Config): CSSProperties => {
  const defaultCreator = () => '1fr';

  const style: CSSProperties = {
    display: 'grid',
    position: 'relative',
    gap: `${rowsGap || 0}px ${columnsGap || 0}px`,
    gridTemplateRows: createPositiveArray(rowsCount)
      .map(rowsHeightCreator ? rowsHeightCreator : defaultCreator)
      .join(' '),
    gridTemplateColumns: createPositiveArray(columnsCount)
      .map(columnsWidthCreator ? columnsWidthCreator : defaultCreator)
      .join(' '),
  };

  return style;
};

const createGridChildrenStyle = (
  from: Grid.Cell,
  to: Grid.Cell,
  groupId?: number
): CSSProperties => {
  const gridRowFrom = from.cords.row;
  const gridRowTo = gridRowFrom !== to.cords.row ? to.cords.row + 1 : to.cords.row;
  const gridRow = `${gridRowFrom}/${gridRowTo}`;

  const gridColFrom = from.cords.column;
  const gridColTo = gridColFrom !== to.cords.column ? to.cords.column + 1 : to.cords.column;
  const gridColumn = `${gridColFrom}/${gridColTo}`;

  return { position: 'relative', gridRow, gridColumn, zIndex: groupId };
};

const enhanceChildren = (mask: Grid.Mask) => (
  child: ReactElement<Grid.ChildrenProps>
): ReactNode => {
  const cellsIds = child.props.cellsIds.split(',').map((item) => +item);
  const [from, to] = [cellsIds[0], cellsIds[cellsIds.length - 1]];
  const childrenStyle = createGridChildrenStyle(mask[from], mask[to], child.props.groupId);

  const clonedChild = cloneElement(child, {
    ...child.props,
    style: {
      ...child.props.style,
      ...childrenStyle,
    },
  });

  return clonedChild;
};

const Grid: FC<Grid.Props> = ({ children, config, style, ...props }) => {
  const mask = useGridMask(config);
  const gridStyle = useMemo(
    () => ({
      ...style,
      ...createGridStyle(config),
    }),
    [config, style]
  );
  const enhancedChildren = Children.map(children, enhanceChildren(mask));

  return (
    <div {...props} style={gridStyle}>
      {enhancedChildren}
    </div>
  );
};

export default Grid;
