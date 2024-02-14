import { TokenOperationType } from '@/common-types/enums/type.enum';

export class DateProvider {
  constructor() {}

  static expireDatePerson(howDays: number): Date {
    const dateValue = new Date();
    dateValue.setDate(dateValue.getDate() + howDays);
    return dateValue;
  }

  static expireDateToken(operation: TokenOperationType): Date {
    const dateValue = new Date();
    if (operation === TokenOperationType.loginAfterValidRegistration) {
      dateValue.setMinutes(dateValue.getMinutes() + 10);
    } else if (operation === TokenOperationType.refreshToken) {
      dateValue.setMinutes(dateValue.getMinutes() + 30);
    } else {
      dateValue.setMinutes(dateValue.getMinutes() + 15);
    }

    return dateValue;
  }
}
