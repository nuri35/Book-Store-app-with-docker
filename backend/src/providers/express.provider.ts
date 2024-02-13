import express, { NextFunction, Response, Request } from 'express';
import Bootstrap from '@middlewares/base.middleware';
import { startRouterConfig } from '@custom-config/router.config';
import { errorMiddleware } from '@/middlewares/error.middleware';
import { responseMiddleware } from '@/middlewares/response.middleware';
import { NotFoundError } from '@responses-errors/not.found.error';
import { ErrorCode, ErrorMessages } from '@bestnetlib/common';
import { logger } from '@/logger/custom.logger';

export class ExpressProvider {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.mountMiddlewares();
    this.mountRoutes();
  }

  static fromExpress(): ExpressProvider {
    return new ExpressProvider();
  }

  private mountMiddlewares(): void {
    this.express = Bootstrap.init(this.express);
    logger.client.info('Middlewares initialization completed:: ...');
  }

  private mountRoutes(): void {
    const routes = startRouterConfig;
    routes.forEach((config) => {
      this.express.use(
        `/${process.env.API_PREFIX!}/${config.label}`,
        config.router
      );
    });
    this.express.all(
      '*',
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          throw new NotFoundError(
            ErrorCode.ENDPOINT_NOT_FOUND,
            ErrorMessages.ENDPOINT_NOT_FOUND,
            [
              {
                logCode: ErrorCode.ENDPOINT_NOT_FOUND,
                logMessage: ErrorMessages.ENDPOINT_NOT_FOUND,
                logData: '',
              },
            ]
          );
        } catch (error) {
          next(error);
        }
      }
    );
    logger.client.info('Routes initialization completed:: ...');
  }

  public init(): void {
    logger.client.info('Server staring:: ...');

    this.express.use(responseMiddleware);
    logger.client.info('Response middleware added:: ...');

    this.express.use(errorMiddleware);
    logger.client.info('Error middleware added:: ...');
    logger.client.info(
      'Route and Http middleware initialization completed:: ...'
    );
    this.express.listen(process.env.PORT, () => {
      logger.client.info(`Server started on port ${process.env.PORT}`);
      logger.client.info(`Worker pid=${process.pid}`);
    });
  }
}
