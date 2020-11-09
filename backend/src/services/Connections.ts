import { v4 } from 'uuid';
import WebSocket from 'websocket';

import { usersService } from '.';

import { Connection, WebsocketActions } from '@models';

class Connections {
  public connections: Connection[] = [];

  private disconnect = (id: string) => {
    this.connections = this.connections.filter((c) => c.id !== id);

    console.log(`${new Date().toLocaleString()}, disconnected: ${id}`);
  };

  public send<T>(
    shouldSendCallback: (connection: Connection) => boolean,
    data: T,
  ): void {
    const parsedData: string = JSON.stringify(data);

    this.connections.forEach((connection) => {
      const shouldSend: boolean = shouldSendCallback(connection);

      if (shouldSend) {
        connection.websocketConnection.sendUTF(parsedData);
      }
    });
  }

  public connect = (request: WebSocket.request) => {
    const { userId } = request.resourceURL.query as any;

    const connection: Connection = {
      id: v4(),
      userId,
      websocketConnection: request.accept(undefined, request.origin),
    };

    this.connections.push(connection);

    console.log(
      `${new Date().toLocaleString()}, connected: ${
        connection.id
      } from origin ${request.origin}`,
    );

    const { websocketConnection } = connection;

    websocketConnection.on('error', () => {
      this.disconnect(connection.id);
    });

    websocketConnection.on('close', () => {
      this.disconnect(connection.id);
    });

    websocketConnection.on('message', (message) => {
      if (message.type === 'utf8') {
        const payload = JSON.parse(message.utf8Data);

        switch (payload.action) {
          case WebsocketActions.NOTIFICATION_SEND:
            usersService.notify(
              payload.data.connectionId,
              payload.data.notification,
            );
            break;
          default:
            break;
        }
      }
    });
  };
}

export const connectionsService = new Connections();
