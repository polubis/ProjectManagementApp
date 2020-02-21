import React from 'react';

import { ButtonProps } from '.';

import classes from './Button.scss';

export const Button = ({
  children,
  variant,
  bg: background,
  color
}: ButtonProps) => {
  const className = [classes.root, classes[variant]].join(' ');

  return (
    <button style={{ color, background }} className={className}>
      {children}
    </button>
  );
};
