import React from 'react';

import ErrorIcon from '@material-ui/icons/Error';

import csx from './Field.scss';

// TODO
// Move components to separate files with their namespace definitions and put them at ui/name-of-component

export namespace FieldBase {
  export interface Props {
    label: string;
    children: React.ReactNode;
    className?: string;
    error?: string;
  }
}

export namespace Field {
  export interface Props
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
    className?: string;
    error?: string;
  }
}

export namespace TextareaField {
  export interface Props
    extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > {
    label: string;
    className?: string;
    error?: string;
  }
}

export const FieldBase = ({ label, error, children, className = '' }: FieldBase.Props) => {
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

export const Field = ({ label, error, className, ...inputProps }: Field.Props) => {
  return (
    <FieldBase label={label} error={error} className={className}>
      <input {...inputProps} />
    </FieldBase>
  );
};

export const TextareaField = ({ label, error, className, ...inputProps }: TextareaField.Props) => {
  return (
    <FieldBase label={label} error={error} className={className}>
      <textarea {...inputProps}></textarea>
    </FieldBase>
  );
};
