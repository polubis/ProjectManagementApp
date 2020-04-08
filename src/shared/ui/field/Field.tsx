import React from 'react';

import ErrorIcon from '@material-ui/icons/Error';

import csx from './Field.scss';

export interface FieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  error?: string;
}

export const Field = ({ label, error, ...inputProps }: FieldProps) => {
  const isInvalid = !!error;

  return (
    <div className={`${csx.field} ${isInvalid ? csx.invalid : ''}`}>
      <label>{label}</label>
      <input placeholder={label} {...inputProps} />
      <div className={csx.validation}>
        {isInvalid && <ErrorIcon />}
        <span className={csx.error}>{error}</span>
      </div>
    </div>
  );
};