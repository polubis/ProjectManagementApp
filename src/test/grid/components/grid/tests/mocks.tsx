import React, { FC } from 'react';
import { GridItemProps } from 'src/test/grid/models/core';

export const _GridItem_: FC<GridItemProps> = ({ cellsIds, ...props }) => <div {...props} />;
