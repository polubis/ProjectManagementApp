import React, { ReactNode } from 'react';

import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';

import csx from './Checkbox.scss';

namespace Checkbox {
  export type OnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: boolean
  ) => void;

  export interface Props {
    invalid?: boolean;
    label: ReactNode;
    value: boolean;
    dataIdx?: string;
    variant?: 'default' | 'informing';
    onChange: OnChange;
  }
}

const checkboxClasses = { root: csx.checkbox, checked: csx.checked };

const Checkbox = ({
  invalid,
  label,
  value,
  variant = 'default',
  dataIdx,
  onChange,
}: Checkbox.Props) => {
  return (
    <FormControlLabel
      label={label}
      classes={{
        root: `${csx.checkboxLabel} ${csx[variant]} ${
          invalid ? csx.invalid : ''
        }`,
      }}
      control={
        <MuiCheckbox
          checked={value}
          onChange={onChange}
          classes={checkboxClasses}
          inputProps={
            {
              'data-idx': dataIdx,
            } as any
          }
        />
      }
    />
  );
};

export default Checkbox;
