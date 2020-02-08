import React from 'react';

import { TextProps } from '.';

import classes from './Text.scss';

export const Text = ({ children, variant }: TextProps) => {
  switch (variant) {
    case 'title':
      return <h5 className={classes.title}>{children}</h5>;
    case 'subTitle':
      return <p className={classes.subTitle}>{children}</p>;
    case 'label':
      return <label className={classes.label}>{children}</label>;
  }
};
