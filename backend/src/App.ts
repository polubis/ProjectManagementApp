import BodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { Server } from 'http';
import { Controllers } from '@controllers';
import { DBConnection } from '@db';
import { WSConnection } from '@ws';
// import { ErrorHandler } from '@middlewares';
import { Mongoose } from 'mongoose';
import WebSocketServer from 'websocket/lib/WebSocketServer';
import ValidateRequests from './ws/ValidateRequests';

class App {
  private app: Express;
  public db: Mongoose;
  public ws: typeof WebSocketServer;
  public server: Server;

  constructor() {
    this.configure();
    this.registerRoutes();
    // this.addRoutingMiddleware();
    this.createServer();
    this.initDb();
    this.initWs();
  }

  /** Creates express app and adds middleware. */
  private configure = () => {
    this.app = express();

    this.app.set('port', process.env.PORT || 8080);

    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({ extended: true }));
    this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  };

  /** Register routes in application. */
  private registerRoutes = () => {
    Controllers.forEach(({ path, controller }) => {
      this.app.use(`/api/${path}`, controller);
    });
  };

  // /** Adds routing middleware. */
  // private addRoutingMiddleware = () => {
  //   this.app.use(ErrorHandler.parse());
  // };

  /** Logs information after server start. */
  private log = () => {
    console.log(
      `Service running at port ${this.app.get('port')} in ${this.app.get(
        'env',
      )} mode`,
    );
    console.log('Date: ', new Date().toDateString());
  };

  /** Creates server and adds logger. */
  private createServer = () => {
    this.server = this.app.listen(this.app.get('port'), this.log);
  };

  /** Initializes database. */
  private initDb = () => {
    this.db = DBConnection;
  };

  /** Initializes websocket connection */
  private initWs = () => {
    const ws = new WSConnection(this.server);
    this.ws = ws.connection;
    ValidateRequests(this.ws);
  };
}

export default new App();
