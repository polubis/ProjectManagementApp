import React from 'react';

import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';

import csx from './Checkbox.scss';

namespace Checkbox {
  export interface Props {
    label: string;
    value: boolean;
    dataIdx?: number | string;
    variant?: 'default' | 'informing';
    onChange: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  }
}

const checkboxClasses = { root: csx.checkbox, checked: csx.checked };

const Checkbox = ({ label, value, variant = 'default', dataIdx, onChange }: Checkbox.Props) => {
  return (
    <FormControlLabel
      label={label}
      classes={{
        root: `${csx.checkboxLabel} ${csx[variant]}`
      }}
      control={
        <MuiCheckbox
          checked={value}
          onChange={onChange}
          classes={checkboxClasses}
          inputProps={
            {
              'data-idx': dataIdx
            } as any
          }
        />
      }
    />
  );
};

export default Checkbox;
