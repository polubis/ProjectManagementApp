export enum NotificationType {
  TEMPLATE_ADDED = 'TEMPLATE_ADDED',
}

export interface Notification {
  id: number;
  content: string;
  type: NotificationType;
  createdAt: Date;
  author: string | null;
}
