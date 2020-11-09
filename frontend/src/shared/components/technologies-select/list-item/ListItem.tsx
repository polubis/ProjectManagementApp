import React from 'react';

import { SelectBase, Checkbox } from 'ui';

import { Technology } from 'core/api';

import { TechnologyChip } from 'shared/components';

import csx from './ListItem.scss';

const ListItem = ({
  style,
  index,
  data: { items, onSelect }
}: SelectBase.ListChildProps<Technology>) => {
  const { dataIdx, label, pictureUrl, value } = items[index];

  return (
    <div className={csx.listItem} style={style}>
      <Checkbox
        dataIdx={dataIdx}
        label={<TechnologyChip className={csx.technology} name={label} url={pictureUrl} />}
        value={value}
        onChange={onSelect}
      />
    </div>
  );
};

export default ListItem;
