import React, { ReactNode } from 'react';

import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core';

import csx from './Checkbox.scss';

namespace Checkbox {
  export namespace Events {
    export type Change = React.ChangeEvent<HTMLElement>;
  }

  export type OnChange = (event: Events.Change, checked: boolean) => void;

  export interface Props {
    label: ReactNode;
    value?: boolean;
    variant?: 'default' | 'informing';
    className?: string;
    dataIdx?: number | string;
    onChange?: OnChange;
  }
}

const Checkbox = ({
  label,
  value,
  variant = 'default',
  className = '',
  dataIdx,
  onChange
}: Checkbox.Props) => {
  return (
    <FormControlLabel
      label={label}
      classes={{
        root: `${csx.checkboxLabel} ${csx[variant]} ${className}`
      }}
      control={
        <MuiCheckbox
          checked={value}
          onChange={onChange}
          classes={{ root: csx.checkbox, checked: csx.checked }}
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
