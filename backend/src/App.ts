import BodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { Server } from 'http';
import { Mongoose } from 'mongoose';
import WebSocketServer from 'websocket/lib/WebSocketServer';

// import { Controllers } from '@controllers';
import { DBConnection } from '@db';
import { WSConnection } from '@ws';

import { __PORT__ } from '@consts';

class App {
  private app: Express;
  public db: Mongoose;
  public ws: typeof WebSocketServer;
  public server: Server;

  constructor() {
    this.configure();
    // this.registerRoutes();
    this.createServer();
    this.initDb();
    this.initWs();
  }

  private configure = () => {
    this.app = express();

    this.app.set('port', __PORT__ || 8080);

    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({ extended: true }));
    this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  };

  // private registerRoutes = () => {
  //   Controllers.forEach(({ path, controller }) => {
  //     this.app.use(`/api/${path}`, controller);
  //   });
  // };

  private log = () => {
    console.log(
      `Service running at port ${this.app.get('port')} in ${this.app.get(
        'env',
      )} mode`,
    );
    console.log('Date: ', new Date().toDateString());
  };

  private createServer = () => {
    this.server = this.app.listen(this.app.get('port'), this.log);
  };

  private initDb = () => {
    this.db = DBConnection;
  };

  private initWs = () => {
    const ws = new WSConnection(this.server);
    this.ws = ws.connection;
  };
}

export default new App();
