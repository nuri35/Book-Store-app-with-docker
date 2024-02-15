import { NotificationHandler } from '@notifications/handle';
import { natsWrapper } from '@providers/nats.provider';
import { RouterPath } from '@common-types/enums/router.enum';
import { WelcomeEmailTemplate } from '@template//verify.mail.template';
import {
  IDEM,
  OperationEmailTemplate,
} from '@common-types/interfaces/notifications.interface';
import { EmailCreatedPublisher } from '@events/publishers/mail.created.publisher';
import { EmailTypes } from '@bestnetlib/common';
import { JwtProvider } from '@/providers/jwt.provider';
import { TokenOperationType } from '@/common-types/enums/type.enum';

export class EmailService extends NotificationHandler {
  private operationTemplates: {
    [key in TokenOperationType]: OperationEmailTemplate;
  } = {
    [TokenOperationType.welcomeAfterRegistration]: {
      emailTemplate: WelcomeEmailTemplate,
      emailType: EmailTypes.VerifySubject, // otomatık verify etmiş gibi davranıyoruz
    },
    [TokenOperationType.loginAfterValidRegistration]: {
      routerPath: RouterPath.LoginEndpoint,
      emailTemplate: WelcomeEmailTemplate, // this is a example. It should be a different template
      emailType: EmailTypes.VerifySubject, // this is a example. It should be a different template
    },
    [TokenOperationType.refreshToken]: {
      routerPath: RouterPath.ReNewTokenEndpoint,
      emailTemplate: WelcomeEmailTemplate, // this is a example. It should be a different template
      emailType: EmailTypes.VerifySubject, // this is a example. It should be a different template
    },
  };

  private emailTemplateValue: string;
  constructor(private userDetails: IDEM) {
    super();
  }

  private generateUrlToken(routerPath: RouterPath): string {
    const urlToken = JwtProvider.generateUrlToken(
      this.userDetails.content.token!,
      routerPath
    );
    return urlToken;
  }

  private getOperationTemplate(): OperationEmailTemplate {
    const operation = this.userDetails.operation;
    if (operation in this.operationTemplates) {
      return this.operationTemplates[operation];
    } else {
      throw new Error(`Invalid operation: ${operation}`);
    }
  }

  protected generateNotificationTemplate(): void {
    const { routerPath, emailTemplate } = this.getOperationTemplate();
    if (this.userDetails.content.token && routerPath) {
      const urlToken = this.generateUrlToken(routerPath);
      this.userDetails.content.token = urlToken;
    }

    this.emailTemplateValue = new emailTemplate({
      content: this.userDetails.content,
    }).run();
  }

  protected enqueueNotification(): void {
    new EmailCreatedPublisher(natsWrapper.client).publish({
      email: this.userDetails.contact,
      template: this.emailTemplateValue,
      type: this.operationTemplates[this.userDetails.operation].emailType,
    });
  }
}
