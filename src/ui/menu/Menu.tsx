import React from 'react';

import { Menu as MuiMenu, makeStyles, MenuProps } from '@material-ui/core';

import { Palette } from 'styles';

namespace Menu {
  type BaseProps = {
    background?: string;
    boxShadow?: string;
    open?: boolean;
    width?: number;
  };

  export type Props = Omit<MenuProps, 'open'> & BaseProps;

  export interface Styles {
    width: number;
    boxShadow: string;
    background: string;
  }
}

const useStyles = makeStyles({
  paper: {
    width: ({ width }: Menu.Styles) => `${width}px`,
    boxShadow: ({ boxShadow }: Menu.Styles) => boxShadow,
    background: ({ background }: Menu.Styles) => background,
    color: Palette.primary,
    marginTop: '2px',

    '& > ul': {
      padding: '6px 0',
    },
  },
});

const Menu = ({
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  transformOrigin = { vertical: 'top', horizontal: 'right' },
  background = Palette.secondary,
  boxShadow = Palette.shadowPrimary,
  width = 300,
  ...props
}: Menu.Props): JSX.Element => {
  const classes = useStyles({ background, boxShadow, width });

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
