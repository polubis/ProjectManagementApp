import React, { FC } from 'react';

import Grid from './Grid';

const GridItem: FC<Grid.ChildrenProps> = ({
  cellsIds,
  groupId,
  resizing,
  zIndexOnResize = 100,
  ...props
}) => (
  <div
    {...props}
    data-cells-ids={cellsIds}
    data-group-id={groupId}
    style={{ ...props.style, zIndex: resizing ? zIndexOnResize : props.style.zIndex }}
  />
);

export default GridItem;
