import React, { ReactNode, useState } from 'react';

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
  const [isChecked, setIsChecked] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange(event, event.target.checked);
  };

  return (
    <label className={`${csx.checkboxLabel} ${csx[variant]}`}>
      <input
        type="checkbox"
        checked={isChecked}
        className={`${csx.checkbox} ${isChecked ? csx.checked : ''}`}
        onChange={handleChange}
        data-idx={dataIdx}
      ></input>
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
