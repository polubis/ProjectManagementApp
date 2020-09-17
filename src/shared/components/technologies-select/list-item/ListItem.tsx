import React from 'react';

import { SelectBase, Checkbox } from 'ui';

import { TechnologyChip } from 'shared/components';

import csx from './ListItem.scss';

const ListItem = ({ style, index, data: { items, onSelect } }: SelectBase.ListChildProps) => {
  const { dataIdx, label, value } = items[index];
  const pictureUrl = items[index]['pictureUrl'];

  return (
    <div className={csx.listItem} style={style}>
      <Checkbox
        dataIdx={dataIdx}
        label={<TechnologyChip avatar={pictureUrl} name={label} />}
        value={value}
        onChange={onSelect}
      />
    </div>
  );
};

export default ListItem;
