import React from 'react';

import { FieldBase } from 'ui';

namespace InputField {
  export interface Props
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
    className?: string;
    error?: string;
  }
}

const InputField = ({ label, error, className, ...inputProps }: InputField.Props) => {
  return (
    <FieldBase label={label} error={error} className={className}>
      <input {...inputProps} />
    </FieldBase>
  );
};

export default InputField;
