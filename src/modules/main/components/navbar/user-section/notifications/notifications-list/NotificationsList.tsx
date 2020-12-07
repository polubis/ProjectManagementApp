import React, { useCallback } from 'react';

import { Notification } from 'shared/models';

import NotificationListItem from './notification-list-item';
import NotificationsListItemsMap from './notifications-list-items-map';

import csx from './NotificationsList.scss';

namespace NotificationsList {
  export interface Props {
    notifications: Notification<unknown>[];
    onClick?(id: number): void;
  }
}

const NotificationsList = ({ notifications, onClick }: NotificationsList.Props): JSX.Element => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
      onClick(+e.currentTarget.getAttribute('data-id'));
    },
    [onClick]
  );

  return (
    <ul className={csx.notificationsList}>
      {notifications.length > 1 && <div className={csx.marker} />}

      {notifications.map((notification) => (
        <NotificationListItem
          {...NotificationsListItemsMap[notification.type](notification)}
          key={notification.id}
          data={notification}
          onClick={handleClick}
        />
      ))}
    </ul>
  );
};

export default NotificationsList;
