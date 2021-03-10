import React, {
  FC,
  useMemo,
  CSSProperties,
  DetailedHTMLProps,
  Children,
  ReactElement,
  ReactNode,
} from 'react';

namespace Grid {
  export interface Config {
    rowsCount: number;
    columnsCount: number;
    rowsGap?: number;
    columnsGap?: number;
    rowsHeightCreator?: (iteration: number) => string;
    columnsWidthCreator?: (iteration: number) => string;
  }

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

  export interface ChildrenProps {
    cellsIds: string;
    groupId: number;
  }

  export interface Props
    extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    config: Config;
  }
}

const createPositiveArray = (length: number): number[] => Array.from({ length }, (_, i) => i + 1);

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

const createMask = ({ rowsCount, columnsCount }: Grid.Config): Grid.Mask => {
  const [rowsArray, colsArray] = [
    createPositiveArray(rowsCount),
    createPositiveArray(columnsCount),
  ];

  let id = 1;
  const mask: Grid.Mask = {};

  rowsArray.forEach((row) => {
    colsArray.forEach((column) => {
      mask[id] = { id, cords: { row, column } } as Grid.Cell;
      id++;
    });
  });

  return mask;
};

const enhanceChildren = (child: ReactElement<Grid.ChildrenProps>, idx: number) => {
  console.log(idx);
};

const Grid: FC<Grid.Props> = ({ children, config, style, ...props }) => {
  const mask = useMemo(() => createMask(config), [config]);
  const gridStyle = useMemo(
    () => ({
      ...style,
      ...createGridStyle(config),
    }),
    [config, style]
  );
  const enhancedChildren = Children.map(children, (child, idx) => {});

  return (
    <div {...props} style={gridStyle}>
      {children}
    </div>
  );
};

export default Grid;
