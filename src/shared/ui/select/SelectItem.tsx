import React from 'react';

import { Checkbox, Menu, SelectItemDataProps } from '..';

export const SelectItem = ({ style, index, data }: Menu.ChildrenProps<SelectItemDataProps>) => {
  const { items, onSelect } = data;

  const item = items[index];

  return (
    <div style={style}>
      <Checkbox dataId={item.dataId} onChange={onSelect} label={item.label} value={item.value} />
    </div>
  );
};
