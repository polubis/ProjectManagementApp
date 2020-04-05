import React from 'react';

import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';

import csx from './Checkbox.scss';

export interface CheckboxProps {
  label: string;
}

export const Checkbox = ({ label }: CheckboxProps) => {
  return (
    <FormControlLabel
      classes={{ root: csx.checkboxLabel }}
      control={<MuiCheckbox classes={{ root: csx.checkbox, checked: csx.checked }} />}
      label={label}
    />
  );
};
