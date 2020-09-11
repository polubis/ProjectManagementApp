import React from 'react';

import { SelectBase, Checkbox } from 'ui';

import csx from './ListItem.scss';

const ListItem = ({ style, index, data: { items, onSelect } }: SelectBase.ListChildProps) => {
  const { dataIdx, label, value } = items[index];

  return (
    <div className={csx.listItem} style={style}>
      <Checkbox
        label={label}
        dataIdx={dataIdx}
        value={value}
        onChange={onSelect}
      />
    </div>
  );
};

export default ListItem;
