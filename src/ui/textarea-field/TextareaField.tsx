import React from 'react';

import { FieldBase } from 'ui';

namespace TextareaField {
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

const TextareaField = ({
  label, error, className, ...inputProps
}: TextareaField.Props) => (
  <FieldBase label={label} error={error} className={className}>
    <textarea {...inputProps} />
  </FieldBase>
);

export default TextareaField;
