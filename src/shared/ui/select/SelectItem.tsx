import React from 'react';

import { Checkbox, MenuItemProps, SelectItemDataProps } from '..';

export const SelectItem = ({ style, index, data }: MenuItemProps<SelectItemDataProps>) => {
  const { items, onSelect } = data;

  const item = items[index];

  return (
    <div style={style}>
      <Checkbox dataId={item.dataId} onChange={onSelect} label={item.label} value={item.value} />
    </div>
  );
};
