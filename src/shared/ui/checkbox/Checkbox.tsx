import React from 'react';

import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';

import csx from './Checkbox.scss';

namespace Checkbox {
  export interface Props {
    label: string;
    value?: boolean;
    variant?: 'default' | 'informing';
    dataId?: number | string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  }
}

const Checkbox = ({
  label,
  value,
  variant = 'default',
  onChange,
  dataId
}: Checkbox.Props) => {
  return (
    <FormControlLabel
      label={label}
      classes={{
        root: [csx.checkboxLabel, csx[variant]].join(' ')
      }}
      control={
        <MuiCheckbox
          checked={value}
          onChange={onChange}
          classes={{ root: csx.checkbox, checked: csx.checked }}
          inputProps={
            {
              'data-id': dataId
            } as any
          }
        />
      }
    />
  );
};

export default Checkbox;