import React, { memo } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button, SelectBase } from 'ui';

import csx from './SelectControl.scss';

namespace SelectControl {
  export interface Props extends Partial<SelectBase.ChildrenInjectedProps> {
    label: string;
    value: { [key: string]: boolean };
  }
}

const SelectControl = memo(({ label, menuOpen, value, onClick }: SelectControl.Props) => {
  const { length } = SelectBase.getSelected(value);

  return (
    <div className={`${csx.selectControl} ${menuOpen ? csx.menuOpen : ''}`}>
      {length > 0 ? (
        <span>
          {length} {label} were selected
        </span>
      ) : (
        <span className={csx.placeholder}>Select {label}</span>
      )}

      <Button className={csx.toggleBtn} theme="primaryTransparent" onClick={onClick}>
        <ExpandMoreIcon />
      </Button>
    </div>
  );
});

export default SelectControl;
