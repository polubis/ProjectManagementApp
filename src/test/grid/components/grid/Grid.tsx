import React, { FC, useMemo } from 'react';

import { createDimension } from '../../core/createDimension';
import { enhanceGridChildren } from '../../core/enhanceGridChildren';
import { createGap } from '../../core/createGap';
import { createGridStyle } from '../../core/createGridStyle';
import { createMask } from '../../core/createMask';
import { GridProps } from '../../models/core';

const Grid: FC<GridProps> = ({
  children,
  rows,
  cols,
  rowGap,
  colGap,
  rowsCreator,
  colsCreator,
  style,
  ...restProps
}) => {
  const gap = useMemo(() => createGap(rowGap, colGap), [rowGap, colGap]);
  const dimension = useMemo(() => createDimension(rows, cols, gap), [rows, cols, gap]);
  const gridStyle = useMemo(
    () => ({
      ...style,
      ...createGridStyle(dimension, rowsCreator, colsCreator),
    }),
    [dimension, rowsCreator, colsCreator, style]
  );
  const mask = useMemo(() => createMask(dimension), [dimension]);
  const enhancedChildren = useMemo(() => enhanceGridChildren(children, mask), [children, mask]);

  return (
    <div {...restProps} style={gridStyle}>
      {enhancedChildren}
    </div>
  );
};

Grid.defaultProps = {
  rowGap: 0,
  colGap: 0,
};

export default Grid;
