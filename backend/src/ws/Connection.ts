import WebSocketServer from 'websocket/lib/WebSocketServer';
import { Server } from 'http';

export default class Connection {
  public connection: typeof WebSocketServer;

  constructor(httpServer: Server) {
    this.createConnection(httpServer);
  }

  private createConnection = (httpServer: Server) => {
    try {
      this.connection = new WebSocketServer({
        httpServer,
        autoAcceptConections: false,
      });
      console.log('Websocket connection established');
    } catch (err) {
      return console.error('Websocket connection:', err);
    }
  };
}
