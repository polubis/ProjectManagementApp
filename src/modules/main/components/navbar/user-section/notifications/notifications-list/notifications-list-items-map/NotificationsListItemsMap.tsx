import React from 'react';
import { NavLink } from 'react-router-dom';

import AddTemplateIcon from '@material-ui/icons/Queue';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Notification,
  NotificationType,
  TemplateAddedNotification,
  TemplateDeletedNotification,
  TemplateUpdatedNotification,
} from 'shared/models';

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
  [NotificationType.TEMPLATE_ADDED]: ({ data: { templateId } }: TemplateAddedNotification) => ({
    avatar: (
      <div className={csx.icon}>
        <AddTemplateIcon />
      </div>
    ),
    content: (
      <div className={csx.templateAddedContent}>
        <span>Template in your styles has been added</span>
        <NavLink to={`/app/templates/all/${templateId}`}>CHECK</NavLink>
      </div>
    ),
  }),

  [NotificationType.TEMPLATE_DELETED]: ({
    data: { templateName, templateAuthor },
  }: TemplateDeletedNotification) => ({
    avatar: (
      <div className={csx.icon}>
        <DeleteIcon />
      </div>
    ),
    content: (
      <div className={csx.templateDeletedContent}>
        <span>
          Template <b>{templateName}</b> created by <b>{templateAuthor}</b> has been deleted
        </span>
      </div>
    ),
  }),

  [NotificationType.TEMPLATE_UPDATED]: ({
    data: { templateId, templateName, templateAuthor },
  }: TemplateUpdatedNotification) => ({
    avatar: (
      <div className={csx.icon}>
        <EditIcon />
      </div>
    ),
    content: (
      <div className={csx.templateUpdatedContent}>
        <span>
          Template <b>{templateName}</b> by <b>{templateAuthor}</b> has been updated
        </span>
        <NavLink to={`/app/templates/all/${templateId}`}>CHECK</NavLink>
      </div>
    ),
  }),
};

export default NotificationsListItemsMap;
