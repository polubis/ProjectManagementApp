import React from 'react';

import { Palette } from 'styles';

import { TextProps, TextVariants } from '.';

import classes from './Text.scss';

export const Text = ({ children, variant, color }: TextProps) => {
  return React.createElement(TextVariants[variant], {
    children,
    style: { color: Palette[color] },
    className: classes[variant]
  });
};
