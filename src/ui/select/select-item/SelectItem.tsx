import React from 'react';
import { ListChildComponentProps } from 'react-window';

import { Checkbox, Select } from 'ui';

import csx from './SelectItem.scss';

namespace SelectItem {
  export interface Data {
    items: Checkbox.Props[];
    onSelect: Select.OnSelect;
  }

  export interface Props extends Omit<ListChildComponentProps, 'data'> {
    data: Data;
  }
}

const SelectItem = ({ style, index, data: { items, onSelect } }: SelectItem.Props) => (
  <div className={csx.item} style={style}>
    <Checkbox {...items[index]} onChange={onSelect} />
  </div>
);

export default SelectItem;
