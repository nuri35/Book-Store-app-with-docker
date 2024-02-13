import DataSourceFactory from '@source/data.source';
import { logger } from '@/logger/custom.logger';
class DatabaseProvider {
  async init(): Promise<void> {
    try {
      await DataSourceFactory.source.initialize();
      logger.client.info('Database connection is successful::...');
    } catch (err: any) {
      logger.client.error(err.message);
    }
  }
}

export const databaseSource = new DatabaseProvider();
