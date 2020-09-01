import React, { useRef, useCallback } from 'react';

import { FieldBase } from '..';

import csx from './FileField.scss';

namespace FileField {
  export interface Props
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string;
    error?: string;
    label: string;
  }
}

const FileField = ({ className, error, label, value, onChange, ...inputProps }: FileField.Props) => {
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
    [onChange, inputProps['data-idx']]
  );

  return (
    <FieldBase label={label} error={error} className={className}>
      <div className={csx.fileField} onClick={open}>
        <h3>Drop your image here or browse</h3>
        <span>Supports only JPEG, PNG</span>
      </div>
      <input {...inputProps} hidden ref={ref} type="file" onChange={handleChange} />
    </FieldBase>
  );
};

export default FileField;
