import React from 'react';

import { ButtonProps, ButtonVariantsMap } from '.';

import classes from './Button.scss';

const variants: ButtonVariantsMap = {
  filled: classes.filled,
  outlined: classes.outlined
};

export const Button = ({ children, variant, ...rest }: ButtonProps) => {
  const btnClasses = [classes.root, variants[variant]].join(' ');

  return (
    <button {...rest} className={btnClasses}>
      {children}
    </button>
  );
};
