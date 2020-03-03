import React from 'react';

import { TextProps, TextVariants } from '.';
import { Palette } from 'styles';

import classes from './Text.scss';

export const Text = ({ children, variant, color }: TextProps) => {
  return React.createElement(TextVariants[variant], {
    children,
    style: { color: Palette[color] },
    className: classes[variant]
  });
};
