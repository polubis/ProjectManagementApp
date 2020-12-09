import React from 'react';
import { NavLink } from 'react-router-dom';

import AddTemplateIcon from '@material-ui/icons/Queue';

import { Notification, NotificationType, TemplateAddedNotification } from 'shared/models';

import csx from './NotificationsListItemsMap.scss';

type ContentMap = {
  [K in keyof typeof NotificationType]: (
    item: Notification<unknown>
  ) => {
    avatar: React.ReactElement;
    content: React.ReactElement;
  };
};

const NotificationsListItemsMap: ContentMap = {
  [NotificationType.TEMPLATE_ADDED]: ({ id }: TemplateAddedNotification) => ({
    avatar: (
      <div className={csx.icon}>
        <AddTemplateIcon />
      </div>
    ),
    content: (
      <div className={csx.templateAddedContent}>
        <span>Template in your styles has been added</span>
        <NavLink to={`/app/templates/all/${id}`}>CHECK</NavLink>
      </div>
    ),
  }),
};

export default NotificationsListItemsMap;
