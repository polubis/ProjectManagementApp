import React from 'react';

import { Button as MuiButton, IconButton as MuiIconButton } from '@material-ui/core';

import csx from './Button.scss';

namespace Button {
  export interface Props
    extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
    children: React.ReactNode;
    variant?: 'default' | 'icon';
    theme?: 'primaryDark' | 'primaryTransparent';
  }
}

const Button = ({
  children,
  variant = 'default',
  theme = 'primaryDark',
  ...btnProps
}: Button.Props) => {
  if (variant === 'icon') {
    return (
      <MuiIconButton {...(btnProps as any)} classes={{ root: `${csx.iconButton} ${csx[theme]}` }}>
        {children}
      </MuiIconButton>
    );
  }

  return (
    <MuiButton {...(btnProps as any)} classes={{ root: `${csx.button} ${csx[theme]}` }}>
      {children}
    </MuiButton>
  );
};

export default Button;
