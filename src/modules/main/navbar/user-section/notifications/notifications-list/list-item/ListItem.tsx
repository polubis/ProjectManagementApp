import React from 'react';

import { Notification } from 'core/api';

import Content from './content';

import UnreadedIcon from '../../unreaded-icon';

import csx from './ListItem.scss';

namespace ListItem {
  export interface Props {
    item: Notification
  }
}

const ListItem = ({ item }: ListItem.Props) => (
  <li className={csx.listItem}>
    <UnreadedIcon className={csx.unreadedIcon} />
    <Content item={item} />
  </li>
);

export default ListItem;
