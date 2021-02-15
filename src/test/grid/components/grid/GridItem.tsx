import React, { FC } from 'react';

import { GridItemProps } from '../../models/core';

const GridItem: FC<GridItemProps> = ({ cellsIds, ...props }) => <div {...props} />;

export default GridItem;
