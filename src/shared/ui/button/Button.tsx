import React from 'react';

import { Button as MuiButton, IconButton as MuiIconButton } from '@material-ui/core';

import csx from './Button.scss';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: 'default' | 'icon';
  theme?: 'primaryDark';
}

export const Button = ({
  children,
  variant = 'default',
  theme = 'primaryDark',
  ...btnProps
}: ButtonProps) => {
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
