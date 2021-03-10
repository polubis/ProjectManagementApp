import React, { FC } from 'react';
import { GridItemProps } from '../../../models/core';

export const _GridItem_: FC<GridItemProps> = ({ cellsIds, groupId, ...props }) => (
  <div {...props} />
);
