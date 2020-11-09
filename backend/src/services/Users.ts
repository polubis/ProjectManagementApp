import { connectionsService } from '.';

import { WebsocketActions, Notification } from '@models';

class Users {
  public connectionCreated = (connectionId: string) => {
    connectionsService.send((c) => c.id === connectionId, {
      action: WebsocketActions.CONNECTION_CREATED,
      data: { connectionId },
    });
  };

  public notify = (connectionId: string, notification: Notification) => {
    connectionsService.send((c) => c.id === connectionId, {
      action: WebsocketActions.NOTIFICATION_SEND,
      data: notification,
    });
  };
}

export const usersService = new Users();
