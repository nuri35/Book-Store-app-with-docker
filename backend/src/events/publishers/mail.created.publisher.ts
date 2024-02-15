import { Publisher, Channels, EmailCreatedEvent } from '@bestnetlib/common';

export class EmailCreatedPublisher extends Publisher<EmailCreatedEvent> {
  channel: Channels.EmailCreated = Channels.EmailCreated;
  pid: number = process.pid;
}
