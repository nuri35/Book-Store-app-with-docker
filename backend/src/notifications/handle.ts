export abstract class NotificationHandler {
  //  emaıl management or other notifaction services
  constructor() {}
  protected abstract enqueueNotification(): void;
  protected abstract generateNotificationTemplate(): void;

  processNotification() {
    this.generateNotificationTemplate();
    this.enqueueNotification();
  }
}
