import React from 'react';

import ErrorIcon from '@material-ui/icons/Error';

import csx from './FieldBase.scss';

namespace FieldBase {
  export interface Props {
    label: string;
    children: React.ReactNode;
    className?: string;
    error?: string;
  }
}

const FieldBase = ({
  label, error, children, className = '',
}: FieldBase.Props) => (
  <div className={`${csx.fieldBase} ${className} ${error ? csx.invalid : ''}`}>
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

export default FieldBase;
