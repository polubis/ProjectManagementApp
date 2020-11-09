import WebSocket from 'websocket';

export enum WebsocketActions {
  CONNECTION_CREATED = 'CONNECTION_CREATED',
  NOTIFICATION_SEND = 'NOTIFICATION_SEND',
}

export interface Connection {
  id: string;
  userId: string;
  websocketConnection: WebSocket.connection;
}
