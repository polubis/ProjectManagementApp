import React, { forwardRef } from 'react';

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
    theme?: 'primaryDark' | 'primaryTransparent' | 'danger';
  }
}

const Button = forwardRef(
  ({ children, variant = 'default', theme = 'primaryDark', ...btnProps }: Button.Props, ref) => {
    if (variant === 'icon') {
      return (
        <MuiIconButton
          {...(btnProps as any)}
          classes={{ root: `${csx.iconButton} ${csx[theme]}` }}
          ref={ref}
        >
          {children}
        </MuiIconButton>
      );
    }

    return (
      <MuiButton {...(btnProps as any)} classes={{ root: `${csx.button} ${csx[theme]}` }} ref={ref}>
        {children}
      </MuiButton>
    );
  }
);

export default Button;
