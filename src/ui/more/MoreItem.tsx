import React, { ReactElement } from 'react';

import { Button, Menu } from '..';

import csx from './MoreItem.scss';

namespace MoreItem {
  export interface Data {
    items: ReactElement;
  }

  export type Props = Menu.ChildrenProps<Data>;
}

const MoreItem = ({ style, index, data }: MoreItem.Props) => {
  const { items } = data;

  const children = items[index];

  return (
    <div className={csx.moreItem} style={style}>
      <Button theme="primaryTransparent">{children}</Button>
    </div>
  );
};

export default MoreItem;
