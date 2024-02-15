import express from 'express';
import { logger } from '@logger/custom.logger';

class ExpressProvider {
  public express: express.Application;

  constructor() {
    this.express = express();
  }

  public init(): void {
    logger.client.info('Server staring:: ...');

    this.express.listen(process.env.PORT, () => {
      logger.client.info(`Server started on port ${process.env.PORT}:: ...`);
      logger.client.info(`Worker pid=${process.pid}:: ...`);
    });
  }
}

export default new ExpressProvider();
