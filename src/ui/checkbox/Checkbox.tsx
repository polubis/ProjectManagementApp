import React, { ReactNode, useCallback } from 'react';

import csx from './Checkbox.scss';

namespace Checkbox {
  export type OnChange = (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => void;

  export interface Props {
    label: ReactNode;
    value: boolean;
    dataIdx?: string;
    variant?: 'default' | 'informing';
    onChange: OnChange;
  }
}

const Checkbox = ({ label, value, variant = 'default', dataIdx, onChange }: Checkbox.Props) => {
  const handleChange = useCallback(
    (event) => {
      onChange(event, event.target.checked);
    },
    [onChange]
  );

  return (
    <label className={`${csx.checkboxLabel} ${csx[variant]}`}>
      <div className={`${csx.checkboxBase}`}>
        <input
          type="checkbox"
          checked={value}
          className={`${csx.checkbox} ${value ? csx.checked : ''}`}
          onChange={handleChange}
          data-idx={dataIdx}
        />
      </div>
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
