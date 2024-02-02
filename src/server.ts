import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import * as http from 'http';
import httpStatus from 'http-status';
import Logger from './Modules/Shared/domain/Logger';
import WinstonLogger from './Modules/Shared/infrastructure/WinstoneLogger';
import cors from 'cors';
import routes from './Routes/routes';

export class Server {
  private express: express.Express;
  readonly port: string;
  private readonly logger: Logger;
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.logger = new WinstonLogger();
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    const router = Router();
    router.use(cors());
    router.use(errorHandler());
    this.express.use(routes);
    router.use((err: Error, req: Request, res: Response, next: Function) => {
      this.logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(`  Server is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
        this.logger.info('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      return resolve();
    });
  }
}
