import { TokenOperationType } from '@common-types/enums/type.enum';
import { RouterPath } from '@common-types/enums/router.enum';
import { VerifyEmailTemplate } from '@/template/verify.mail.template';
import { EmailTypes } from '@bestnetlib/common';

export interface IDEM {
  content: Record<string, string>;
  contact: string;
  operation: TokenOperationType.verifyAfterRegistration;
}

export interface OperationEmailTemplate {
  routerPath?: RouterPath;
  emailTemplate: typeof VerifyEmailTemplate;
  emailType: EmailTypes;
}
