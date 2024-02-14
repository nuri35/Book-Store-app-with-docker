import { EnvResult } from '@bestnetlib/common';
import { databaseSource } from '@providers/database.provider';
import { logger } from '@logger/custom.logger';
import { natsWrapper } from '@/providers/nats.provider';
import { ExpressProvider } from '@providers/express.provider';

class App {
  public async loadNats(): Promise<void> {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NODE_ENV === EnvResult.dev
        ? process.pid.toString()
        : `${process.env.NATS_CLIENT_ID!}-${process.pid.toString()}`,
      process.env.NATS_URL!
    );
    natsWrapper.client.on('close', () => {
      logger.client.info('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  }

  public loadLogger(): void {
    logger.initialization();
  }

  public async loadDatabase(): Promise<void> {
    await databaseSource.init();
  }

  public loadServer(): void {
    ExpressProvider.fromExpress().init();
  }
}

export default new App();
// buraya kadar yarın kaldıgın yerden devam edersın.... 10'Da buraya başla...
