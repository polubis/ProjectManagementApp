import { Children, cloneElement, ReactElement } from 'react';

import { EnhancedGridChildren, GridItemProps, Mask } from '../models/core';
import { createCells } from './createCells';
import { createGridChildrenStyle } from './createGridChildrenStyle';

export const enhanceGridChildren = (
  children: ReactElement | ReactElement[],
  mask: Mask
): EnhancedGridChildren[] => {
  const enhancedChildren = Children.map(children, (child: ReactElement<GridItemProps>) => {
    const cells = createCells(child.props.cellsIds, mask);
    const childrenStyle = createGridChildrenStyle(cells, child.props.groupId);

    return cloneElement(child, {
      ...child.props,
      style: {
        ...(child.props.style || {}),
        ...childrenStyle,
      },
    }) as EnhancedGridChildren;
  });

  return enhancedChildren;
};
