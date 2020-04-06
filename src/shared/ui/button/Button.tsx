import React from 'react';

import { Button as MuiButton, IconButton as MuiIconButton } from '@material-ui/core';

import csx from './Button.scss';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?(): void;
  variant?: 'default' | 'icon';
  theme?: 'primaryDark';
}

export const Button = ({
  children,
  variant = 'default',
  theme = 'primaryDark',
  onClick
}: ButtonProps) => {
  if (variant === 'icon') {
    return (
      <MuiIconButton classes={{ root: `${csx.iconButton} ${csx[theme]}` }} onClick={onClick}>
        {children}
      </MuiIconButton>
    );
  }

  return (
    <MuiButton classes={{ root: `${csx.button} ${csx[theme]}` }} onClick={onClick}>
      {children}
    </MuiButton>
  );
};
