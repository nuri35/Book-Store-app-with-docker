import { DataSource } from 'typeorm';
import { EnvResult } from '@bestnetlib/common';
import { EveryEventSubscriber } from '@/entities/subscribers/every.event.subscriber';

class DataSourceFactory {
  private Isource: DataSource;

  get source(): DataSource {
    return this.Isource;
  }

  constructor() {
    this.Isource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV === EnvResult.dev ? true : false,
      entities: ['src/entities/**/*{entity.ts,entity.js}'],
      logging: process.env.NODE_ENV === EnvResult.dev ? true : false,
      subscribers: [EveryEventSubscriber],
    });
  }
}
export default new DataSourceFactory();
// subscribers: ["src/subscriber/*.ts"]
