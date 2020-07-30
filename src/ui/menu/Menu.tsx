import React from 'react';

import { Menu as MuiMenu, makeStyles, MenuProps } from '@material-ui/core';

import { Palette } from 'styles';

namespace Menu {
  type BaseProps = {
    width?: number;
  };

  export type Props = Omit<MenuProps, 'open'> & BaseProps;

  export interface Styles {
    width: number;
  }
}

const useStyles = makeStyles({
  paper: {
    width: (props: Menu.Styles) => props.width + 'px',
    boxShadow: Palette.shadowPrimary,
    background: Palette.surfacePrimary,
    color: Palette.primary,
    marginTop: '2px',

    '& > ul': {
      padding: '6px 0'
    }
  }
});

const Menu = ({
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  transformOrigin = { vertical: 'top', horizontal: 'right' },
  width = 300,
  ...props
}: Menu.Props) => {
  const classes = useStyles({ width });

  return (
    <MuiMenu
      open
      getContentAnchorEl={null}
      classes={classes}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      {...props}
    />
  );
};

export default Menu;
