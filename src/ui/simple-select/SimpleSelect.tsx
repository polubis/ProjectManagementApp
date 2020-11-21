import React from 'react';

import { Checkbox, SelectBase } from '..';

import csx from './SimpleSelect.scss';

namespace SimpleSelect {
  export interface Props {
    children: React.ReactElement;
    items: SelectBase.Item[];
    onSelect: SelectBase.OnSelect;
  }
}

const ListItem = ({ style, index, data: { items, onSelect } }: SelectBase.ListChildProps) => (
  <div className={csx.listItem} style={style}>
    <Checkbox {...items[index]} onChange={onSelect} />
  </div>
);

const SimpleSelect = (props: SimpleSelect.Props) => (
  <SelectBase {...props} listItem={ListItem} searchable={false} />
);

export default SimpleSelect;
