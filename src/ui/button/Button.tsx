import React, { forwardRef } from 'react';

import { Button as MuiButton, IconButton as MuiIconButton } from '@material-ui/core';

import csx from './Button.scss';

const Btn = (props, children) => {
  return React.createElement(
    'button',
    props,
    children
  );
}

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
        <button
          {...(btnProps as any)}
          className={`${csx[theme]} ${csx.iconButton}`}
          ref={ref}
        >
          {children}
        </button>
        
      );
    }

    return (
      <button {...(btnProps as any)} className={`${csx[theme]}`} ref={ref}>
        {children}
      </button>
        
    );
  }
);

export default Button;
