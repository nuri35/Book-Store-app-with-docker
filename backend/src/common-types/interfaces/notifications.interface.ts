import { TokenOperationType } from '@common-types/enums/type.enum';
import { RouterPath } from '@common-types/enums/router.enum';
import { WelcomeEmailTemplate } from '@/template/verify.mail.template';
import { EmailTypes } from '@bestnetlib/common';

export interface IDEM {
  content: Record<string, string>;
  contact: string;
  operation: TokenOperationType;
}

export interface OperationEmailTemplate {
  routerPath?: RouterPath;
  emailTemplate: typeof WelcomeEmailTemplate;
  emailType: EmailTypes;
}
