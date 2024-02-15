import Express from '@providers/express.provider';
import { logger } from '@logger/custom.logger';
import { emailService } from '@services/email.service';
import { natsWrapper } from '@providers/nats.provider';
import { EnvResult } from '@bestnetlib/common';
import { EmailCreatedListener } from '@events/listeners/mail.created.listener';

class App {
  public loadLogger(): void {
    logger.initialization();
  }
  public loadMail(): void {
    emailService.init();
  }

  public async loadNats(): Promise<void> {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NODE_ENV === EnvResult.dev
        ? `${Math.floor(Math.random() * 9000) + 1000}`
        : `${process.env.NATS_CLIENT_ID!}-${process.pid.toString()}`,
      process.env.NATS_URL!
    );
    natsWrapper.client.on('close', () => {
      console.log('Nats conection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  }

  public loadListener(): void {
    new EmailCreatedListener(natsWrapper.client).listen();
  }

  public loadServer(): void {
    Express.init();
  }
}

export default new App();
