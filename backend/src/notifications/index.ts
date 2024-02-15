import { IDEM } from '@common-types/interfaces/notifications.interface';
import { EmailService } from '@notifications/services/email/email.service';

export class ElectronicMessaging {
  private service: EmailService;
  constructor(public dependencies: IDEM) {
    this.dependencies = dependencies;
  }

  public load() {
    this.service = new EmailService(this.dependencies);
    this.service.processNotification();
  }
}
