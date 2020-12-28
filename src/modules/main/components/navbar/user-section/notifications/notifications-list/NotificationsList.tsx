import React, { useCallback, useMemo } from 'react';

import { Notification } from 'shared/models';

import NotificationListItem from './notification-list-item';
import NotificationsListItemsMap from './notifications-list-items-map';

import csx from './NotificationsList.scss';

namespace NotificationsList {
  export interface Props {
    notifications: Notification<unknown>[];
    onClick?(id: string): void;
  }
}

const NotificationsList = ({ notifications, onClick }: NotificationsList.Props): JSX.Element => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
      onClick(e.currentTarget.getAttribute('data-id'));
    },
    [onClick]
  );

  const filteredNotifications = useMemo(
    () => notifications.filter((notification) => NotificationsListItemsMap[notification.type]),
    [notifications]
  );

  return (
    <ul className={csx.notificationsList}>
      {filteredNotifications.length > 1 && <div className={csx.marker} />}

      {filteredNotifications.map((notification) => (
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
