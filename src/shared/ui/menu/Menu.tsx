import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';

import { Menu as MuiMenu, makeStyles } from '@material-ui/core';

import { Palette } from 'styles';

import { MenuProps, MuiMenuStyleProps } from '.';

const useStyles = makeStyles({
  paper: {
    width: (props: MuiMenuStyleProps) => props.width + 'px',
    boxShadow: Palette.shadowPrimary,
    background: Palette.surfacePrimary,
    color: Palette.primary,
    marginTop: '2px',

    '& ul': {
      padding: '6px 0',

      '& label': {
        margin: 0,
        padding: '0 8px',

        '& > span:first-of-type': {
          padding: '12px'
        }
      }
    }
  }
});

export const Menu = <T, R>({
  id,
  anchorEl,
  items,
  children,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  transformOrigin = { vertical: 'top', horizontal: 'right' },
  width = 300,
  height = 300,
  itemSize = 40,
  ...menuItemProps
}: MenuProps<T, R>) => {
  const classes = useStyles({ width });

  const itemData = useMemo(
    () => ({
      items,
      ...menuItemProps
    }),
    [items, menuItemProps]
  );

  return (
    <MuiMenu
      open
      getContentAnchorEl={null}
      id={id}
      anchorEl={anchorEl}
      classes={classes}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      onClose={onClose}
    >
      <FixedSizeList
        itemSize={itemSize}
        height={height}
        width={width}
        itemCount={items.length}
        itemData={itemData}
      >
        {children as any}
      </FixedSizeList>
    </MuiMenu>
  );
};
