import React from 'react';

import { Checkbox, Menu, Select } from '..';

namespace SelectItem {
  export interface Data {
    items: Checkbox.Props[];
    onSelect: Select.OnSelect;
  }

  export type Props = Menu.ChildrenProps<Data>;
}

const SelectItem = ({ style, index, data }: SelectItem.Props) => {
  const { items, onSelect } = data;

  const item = items[index];

  return (
    <div style={style}>
      <Checkbox {...item} onChange={onSelect} />
    </div>
  );
};

export default SelectItem;
