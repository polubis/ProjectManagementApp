import React from 'react';

import ErrorIcon from '@material-ui/icons/Error';

import { FieldBaseProps, FieldProps, TextareaFieldProps } from '.';

import csx from './Field.scss';

export const FieldBase = ({ label, error, children, className = '' }: FieldBaseProps) => {
  return (
    <div className={`${csx.field} ${className} ${error ? csx.invalid : ''}`}>
      <label>{label}</label>
      {children}
      <div className={csx.validation}>
        {error && <ErrorIcon />}
        <span className={csx.error} title={error}>
          {error}
        </span>
      </div>
    </div>
  );
};

export const Field = ({ label, error, className, ...inputProps }: FieldProps) => {
  return (
    <FieldBase label={label} error={error} className={className}>
      <input {...inputProps} />
    </FieldBase>
  );
};

export const TextareaField = ({ label, error, className, ...inputProps }: TextareaFieldProps) => {
  return (
    <FieldBase label={label} error={error} className={className}>
      <textarea {...inputProps}></textarea>
    </FieldBase>
  );
};
