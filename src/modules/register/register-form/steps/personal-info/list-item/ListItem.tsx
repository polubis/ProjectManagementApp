import React, { useCallback } from 'react';

import { SelectBase } from 'ui';

import csx from './ListItem.scss';

const ListItem = ({ style, index, data: { items, onSelect } }) => {
  const { dataIdx, label, value } = items[index];

  return (
    <div className={csx.listItem} style={style}>
      <span onClick={()=>onSelect()}>{label}</span>
    </div>
  );
};

export default ListItem;
