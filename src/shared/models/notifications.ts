import { Template } from './templates';

export interface GetNotificationsPayload {
  limit: number;
  page: number;
}

export interface MarkNotificationAsReadPayload {
  notificationId: string;
}

export enum NotificationType {
  TEMPLATE_ADDED = 'TEMPLATE_ADDED',
}

export interface Notification<T> {
  id: string;
  data: T;
  type: NotificationType;
  creationDate: string;
  readed: boolean;
}

export type TemplateAddedNotification = Notification<Template>;
