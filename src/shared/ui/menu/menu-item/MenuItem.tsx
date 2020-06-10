import React from 'react';

import { Checkbox } from 'shared/ui';

import { MenuItemProps } from '..';

export const MenuItem = ({ data, index, style }: MenuItemProps) => {
  const { items, onSelect } = data;

  const item = items[index];

  return (
    <div style={style}>
      <Checkbox dataId={item.id} label={item.name} value={item.name} onChange={onSelect} />
    </div>
  );
};
