import { Template } from './templates';

export enum NotificationType {
  TEMPLATE_ADDED = 'TEMPLATE_ADDED',
}

export interface Notification<T> {
  id: number;
  data: T;
  type: NotificationType;
  creationDate: string;
  readed: boolean;
}

export type TemplateAddedNotification = Notification<Template>;
