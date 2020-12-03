import React from 'react';

import { Notification, NotificationType } from 'shared/models';

import TemplateAdded from './template-added';

namespace Content {
  export type Component = (item: Notification) => React.ReactElement;

  export type ComponentsMap = {
    [key in keyof typeof NotificationType]: Component;
  };

  export interface Props {
    item: Notification;
  }
}

const ComponentsMap: Content.ComponentsMap = {
  [NotificationType.TEMPLATE_ADDED]: TemplateAdded,
};

const Content = ({ item }: Content.Props) => ComponentsMap[item.type](item);

export default Content;
