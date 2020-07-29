import React from 'react';
import { ListChildComponentProps } from 'react-window';

import { Checkbox, Select } from '../..';

import csx from './SelectItem.scss';

namespace SelectItem {
  export interface Data {
    items: Select.Item[];
    onSelect: Checkbox.OnChange;
  }

  export interface Props extends Omit<ListChildComponentProps, 'data'> {
    data: Data;
  }
}

const SelectItem = ({ style, index, data }: SelectItem.Props) => {
  const { items, onSelect } = data;

  const item = items[index];

  return (
    <div style={style} className={csx.selectItem}>
      <Checkbox {...item} onChange={onSelect} />
    </div>
  );
};

export default SelectItem;
