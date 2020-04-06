import React from 'react';

import { Validation } from 'shared/forms';

import ErrorIcon from '@material-ui/icons/Error';

import csx from './Field.scss';

export interface FieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  isInvalid?: boolean;
  validation?: Validation[];
}

export const Field = ({ label, isInvalid, validation, ...inputProps }: FieldProps) => {
  return (
    <div className={`${csx.field} ${isInvalid ? csx.invalid : ''}`}>
      <label>
        <span>{label}</span>
        {isInvalid && <ErrorIcon />}
      </label>
      <input placeholder={label} {...inputProps} />
    </div>
  );
};
