import React from 'react';

import { FormControlLabel, RadioGroup as MuiRadioGroup, Radio } from '@material-ui/core';

import csx from './RadioGroup.scss';

namespace RadioGroup {
  export interface Option {
    value: string | number;
    label: string;
  }

  export interface Props {
    options: Option[];
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  }
}

const radioClasses = {
  checked: csx.checked,
};

const formControlLabelClasses = {
  label: csx.label,
};

const RadioGroup = ({ options, value, onChange }: RadioGroup.Props): JSX.Element => {
  return (
    <MuiRadioGroup value={value} onChange={onChange}>
      {options.map((option) => (
        <FormControlLabel
          key={option.label}
          value="female"
          classes={formControlLabelClasses}
          control={<Radio classes={radioClasses} />}
          label="Female"
        />
      ))}
    </MuiRadioGroup>
  );
};

export default RadioGroup;
