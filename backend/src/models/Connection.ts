import WebSocket from 'websocket';

export enum WebsocketActions {
  NOTIFY_USER = 'NOTIFY_USER',
  NOTIFY_ALL = 'NOTIFY_ALL',
}

export interface Connection {
  id: string;
  websocketConnection: WebSocket.connection;
  userId?: string;
}
