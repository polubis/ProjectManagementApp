import React, { useCallback, useRef } from 'react';

import { FieldBase } from '..';

import csx from './FileField.scss';

namespace FileField {
  export interface Props
    extends Omit<
      React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
      'value'
    > {
    className?: string;
    error?: string;
    label?: string;
    formats: string;
    value: File | null;
  }
}

const FileField = ({
  className,
  error,
  label,
  formats,
  value,
  onChange,
  ...inputProps
}: FileField.Props) => {
  const ref = useRef(null);

  const open = useCallback(() => {
    ref.current.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...e,
        target: {
          ...e.target,
          dataset: {
            ...e.target.dataset,
            'data-idx': inputProps['data-idx']
          },
          value: e.target.files as any
        }
      });
    },
    [inputProps['data-idx'], onChange]
  );

  return (
    <FieldBase className={className} error={error} label={label}>
      <div className={csx.fileField} onClick={open}>
        {value ? (
          <h3>{value.name}</h3>
        ) : (
          <>
            <h3>Drop your image here or browse</h3>
            <span>Supported formats {formats}</span>
          </>
        )}
      </div>
      <input {...inputProps} hidden ref={ref} type="file" onChange={handleChange} />
    </FieldBase>
  );
};

export default FileField;
