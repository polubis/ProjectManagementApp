import React from 'react';

import { InputProps } from '.';

import classes from './Input.scss';

export const Input = ({ ...rest }: InputProps) => {
  return (
    <div className={classes.root}>
      <input autoFocus autoComplete="none" spellCheck={false} {...rest} />
    </div>
  );
};
