import React from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button, SelectBase } from 'ui';

import csx from './SelectControl.scss';

namespace SelectControl {
  export interface Props extends Partial<SelectBase.ChildrenInjectedProps> {
    label: string | ((selected: string[]) => string);
    placeholder: string;
    value: { [key: string]: boolean };
  }
}

const SelectControl = ({
  label,
  placeholder,
  menuOpen,
  value,
  onClick,
}: SelectControl.Props) => {
  const selected = SelectBase.getSelected(value);

  return (
    <div className={`${csx.selectControl} ${menuOpen ? csx.menuOpen : ''}`}>
      {selected.length > 0 ? (
        <span>{typeof label === 'string' ? label : label(selected)}</span>
      ) : (
        <span className={csx.placeholder}>{placeholder}</span>
      )}

      <Button
        className={csx.toggleBtn}
        theme="primaryTransparent"
        onClick={onClick}
      >
        <ExpandMoreIcon />
      </Button>
    </div>
  );
};

export default SelectControl;
