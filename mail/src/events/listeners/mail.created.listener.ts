import { Listener, EmailCreatedEvent, Channels } from '@bestnetlib/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from '@events/listeners/queue.group.name';
import { emailService } from '@services/email.service';
import { logger } from '@logger/custom.logger';

export class EmailCreatedListener extends Listener<EmailCreatedEvent> {
  readonly channel: Channels.EmailCreated = Channels.EmailCreated;
  queueGroupName = queueGroupName;
  readonly pid = process.pid;

  async onMessage(
    data: EmailCreatedEvent['data'],
    msg: Message
  ): Promise<void> {
    const { template, email, type } = data;
    try {
      await emailService.send(template, email, type);

      msg.ack();
    } catch (err: any) {
      logger.client.error(
        `${err.message} #${msg.getSequence()} Worker pid=${this.pid}:: ...`
      );
    }
  }
}
