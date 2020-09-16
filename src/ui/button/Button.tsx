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
    variant?: 'default' | 'icon' | 'texticon';
    theme?: 'primaryDark' | 'primaryTransparent' | 'danger';
    style?: Object;
  }
}

const Button = forwardRef(
  ({ children, variant = 'default', theme = 'primaryDark', style, ...btnProps }: Button.Props, ref) => {
    switch (variant) {
      case 'icon':
        return (
          <button {...(btnProps as any)} className={`${csx[theme]} ${csx.iconButton} ${style}`} ref={ref} >
            {children}
          </button>
        );
      case 'texticon':
        return (
          <button {...(btnProps as any)} className={`${csx[theme]} ${csx.textIcon} ${style}`} ref={ref}>
            {children}
          </button>
        )
      default:
        return (
          <button {...(btnProps as any)} className={`${csx[theme]} ${style}`} ref={ref}>
            {children}
          </button>
        )
    }
  }
);

export default Button;
