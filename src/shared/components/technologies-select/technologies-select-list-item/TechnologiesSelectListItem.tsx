import React from 'react';
import { ListChildComponentProps } from 'react-window';

import { Checkbox } from 'ui';

import { Technology } from 'shared/components';

import { TechnologiesSelect } from '..';

import csx from './TechnologiesSelectListItem.scss';

namespace TechnologiesSelectListItem {
  export interface Data {
    items: TechnologiesSelect.Item[];
    onSelect: Checkbox.OnChange;
  }

  export interface Props extends Omit<ListChildComponentProps, 'data'> {
    data: Data;
  }
}

const TechnologiesSelectListItem = ({ style, index, data }: TechnologiesSelectListItem.Props) => {
  const { items, onSelect } = data;

  const { dataIdx, label, value } = items[index];

  return (
    <div style={style} className={csx.technologiesSelectListItem}>
      <Checkbox
        className={csx.checkbox}
        dataIdx={dataIdx}
        label={
          <Technology
            name={label}
            avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png"
          />
        }
        value={value}
        onChange={onSelect}
      />
    </div>
  );
};

export default TechnologiesSelectListItem;
