export interface GetNotificationsPayload {
  limit: number;
  page: number;
}

export interface MarkNotificationAsReadPayload {
  notificationId: string;
}

export enum NotificationType {
  TEMPLATE_ADDED = 'TEMPLATE_ADDED',
  TEMPLATE_DELETED = 'TEMPLATE_DELETED',
  TEMPLATE_UPDATED = 'TEMPLATE_UPDATED',
}

export interface Notification<T> {
  id: string;
  data: T;
  type: NotificationType;
  createdDate: string;
  readDate: string | null;
  isRead: boolean;
}

interface TemplateContent {
  templateId: string;
  templateName: string;
  templateAuthor: string;
}

export type TemplateAddedNotification = Notification<TemplateContent>;

export type TemplateDeletedNotification = Notification<Omit<TemplateContent, 'templateId'>>;

export type TemplateUpdatedNotification = Notification<TemplateContent>;
