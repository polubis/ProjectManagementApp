import { Request, Response } from 'express';
import { connectionsService } from '.';

import { WebsocketActions } from '@models';

class Notifications {
  public notifyUsers = ({ body }: Request, res: Response) => {
    try {
      body.userIds.forEach((id: string) => {
        connectionsService.send((c) => c.userId === id, {
          action: WebsocketActions.NOTIFY_USER,
          data: body.notification,
        });
      });

      res.status(200).send(body);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  public notifyAll = ({ body }: Request, res: Response) => {
    try {
      connectionsService.send(() => true, {
        action: WebsocketActions.NOTIFY_ALL,
        data: body.notification,
      });

      res.status(200).send(body);
    } catch (error) {
      res.status(400).send(error);
    }
  };
}

export const notificationsService = new Notifications();
