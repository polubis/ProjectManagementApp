import React from 'react';

import { Notification } from 'core/api';

import ListItem from './list-item';

import csx from './NotificationsList.scss';

namespace NotificationsList {
  export interface Props {
    items: Notification[];
  }
}

const NotificationsList = ({ items }: NotificationsList.Props) => {
  return (
    <ul className={csx.list}>
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default NotificationsList;
