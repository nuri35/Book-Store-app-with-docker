import nats, { Stan } from 'node-nats-streaming';
import { logger } from '@logger/custom.logger';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        logger.client.info('Listener Connected to NATS');
        resolve();
      });

      this.client.on('error', (err: any) => {
        logger.client.error(err);
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
