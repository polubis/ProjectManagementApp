import React from 'react';

import { toDate } from 'utils';

import { Notification } from 'shared/models';
import { UnreadedIcon } from 'shared/components';

import csx from './NotificationListItem.scss';

namespace NotificationListItem {
  export interface Props {
    avatar: React.ReactElement;
    content: React.ReactElement;
    data: Notification<unknown>;
    onClick?(e: React.MouseEvent<HTMLLIElement, MouseEvent>): void;
  }
}

const NotificationListItem = ({
  avatar,
  content,
  data,
  onClick,
}: NotificationListItem.Props): JSX.Element => {
  return (
    <li
      className={csx.notificationListItem}
      data-id={data.id}
      data-type={data.type}
      onClick={onClick}
    >
      <figure className={csx.avatar}>
        {avatar}
        {data.isRead || <UnreadedIcon className={csx.unreadedIcon} />}
      </figure>

      <div className={csx.content}>
        <span className={csx.date}>{toDate(data.createdDate)}</span>
        {content}
      </div>
    </li>
  );
};

export default NotificationListItem;
