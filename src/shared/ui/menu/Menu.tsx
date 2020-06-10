import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';

import { Menu as MuiMenu } from '@material-ui/core';

import { MenuProps, MenuItem, useStyles, menuConfig } from '.';

export const Menu = ({ items, onSelect, ...menuProps }: MenuProps) => {
  const classes = useStyles();

  const itemData = useMemo(
    () => ({
      items,
      onSelect
    }),
    [items]
  );

  return (
    <MuiMenu open {...menuConfig} {...menuProps} classes={classes}>
      <FixedSizeList
        itemSize={40}
        height={300}
        width={300}
        itemCount={items.length}
        itemData={itemData}
      >
        {MenuItem}
      </FixedSizeList>
    </MuiMenu>
  );
};
