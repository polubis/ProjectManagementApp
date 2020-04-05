import React from 'react';

import csx from './Field.scss';

export interface FieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}

export const Field = ({ label, ...inputProps }: FieldProps) => {
  return (
    <div className={csx.field}>
      <label>{label}</label>
      <div className={csx.input}>
        <input {...inputProps} placeholder={label} />
      </div>
    </div>
  );
};
