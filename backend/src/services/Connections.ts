import { Request, Response } from 'express';
import WebSocket from 'websocket';

import { Connection, Result } from '@models';

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

  public logOut = ({ params }: Request, res: Response) => {
    let changedConnection: Connection | null = null;

    try {
      this.connections = this.connections.map((c) => {
        if (c.userId === params.userId) {
          changedConnection = {
            ...c,
            userId: undefined,
          };

          return changedConnection;
        } else return c;
      });

      const result: Result = {
        success: changedConnection ? true : false,
      };

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  public logIn = ({ body, params }: Request, res: Response) => {
    let changedConnection: Connection | null = null;

    try {
      this.connections = this.connections.map((c) => {
        if (c.id === body.connectionId) {
          changedConnection = {
            ...c,
            userId: params.userId,
          };

          return changedConnection;
        } else return c;
      });

      const result: Result = {
        success: changedConnection ? true : false,
      };

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  public connect = (request: WebSocket.request) => {
    const { id } = request.resourceURL.query as any;

    const connection: Connection = {
      id,
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
  };
}

export const connectionsService = new Connections();
