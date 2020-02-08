import React from 'react';

import { TextProps } from '.';
import { Palette } from 'styles';

import classes from './Text.scss';

export const Title = ({ children, color }: TextProps) => {
  return (
    <h5 style={{ color: Palette[color] }} className={classes.title}>
      {children}
    </h5>
  );
};

export const SubTitle = ({ children, color }: TextProps) => {
  return (
    <p style={{ color: Palette[color] }} className={classes.subTitle}>
      {children}
    </p>
  );
};

export const Label = ({ children, color }: TextProps) => {
  return (
    <label style={{ color: Palette[color] }} className={classes.label}>
      {children}
    </label>
  );
};

export const Description = ({ children, color }: TextProps) => {
  return (
    <span style={{ color: Palette[color] }} className={classes.description}>
      {children}
    </span>
  );
};
