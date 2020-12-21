import {
  Notification,
  GetNotificationsPayload,
  MarkNotificationAsReadPayload,
} from 'shared/models';
import { core } from 'shared/instances';

// TODO REFACTOR ON BE
const PATH = '/api/Notifications';

export const getNotifications = (
  params: GetNotificationsPayload
): Promise<Notification<unknown>[]> =>
  core.get<Notification<unknown>[]>(`${PATH}/GetUserNotifications`, { params });

export const markNotificationAsRead = (params: MarkNotificationAsReadPayload): Promise<null> =>
  core.patch<undefined, null>(`${PATH}/MarkAsRead`, undefined, { params });
