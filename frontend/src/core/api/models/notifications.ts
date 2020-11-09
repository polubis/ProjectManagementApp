export enum NotificationType {
  TEMPLATE_ADDED = 'TEMPLATE_ADDED'
}

export interface Notification {
  id: number;
  content: string;
  type: NotificationType;
  creationDate: string;
  readed: boolean;
  author: string | null;
}
