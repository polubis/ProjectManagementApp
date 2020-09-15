import React, { ReactNode } from 'react';

import csx from './Checkbox.scss';

namespace Checkbox {
  export type OnChange = (e: React.ChangeEvent<HTMLInputElement>, value?: boolean) => void;

  export interface Props {
    label: ReactNode;
    value: boolean;
    dataIdx?: string;
    variant?: 'default' | 'informing';
    onChange: OnChange;
  }
}

const Checkbox = ({ label, value, variant = 'default', dataIdx, onChange }: Checkbox.Props) => {
  return (
    <label className={`${csx.checkboxLabel} ${csx[variant]}`}>
      <input
        type="checkbox"
        checked={value}
        className={`${csx.checkbox} ${value ? csx.checked : ''}`}
        onChange={onChange}
        data-idx={dataIdx}
      ></input>
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
