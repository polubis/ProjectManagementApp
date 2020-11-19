import React, { forwardRef } from 'react';

import {
  Button as MuiButton,
  IconButton as MuiIconButton,
} from '@material-ui/core';

import csx from './Button.scss';

namespace Button {
  export interface Props
    extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
    active?: boolean;
    children: React.ReactNode;
    variant?: 'default' | 'icon';
    theme?: 'primaryDark' | 'primaryTransparent' | 'danger' | 'secondary';
  }
}

const Button = forwardRef(
  (
    {
      active,
      children,
      variant = 'default',
      theme = 'primaryDark',
      ...btnProps
    }: Button.Props,
    ref
  ) => {
    if (variant === 'icon') {
      return (
        <MuiIconButton
          {...(btnProps as any)}
          classes={{
            root: `${csx.iconButton} ${csx[theme]} ${active ? csx.active : ''}`,
          }}
          ref={ref}
        >
          {children}
        </MuiIconButton>
      );
    }

    return (
      <MuiButton
        {...(btnProps as any)}
        classes={{
          root: `${csx.button} ${csx[theme]} ${active ? csx.active : ''}`,
        }}
        ref={ref}
      >
        {children}
      </MuiButton>
    );
  }
);

export default Button;
