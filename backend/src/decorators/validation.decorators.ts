import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const IsCustomPhoneNumberFormat = (
  validationOptions?: ValidationOptions
) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isCustomPhoneNumberFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            return false;
          }

          return (
            value.length === 13 &&
            value.startsWith('+90') &&
            ['5', '6', '7', '8', '9'].includes(value.charAt(3))
          );
        },
        defaultMessage(args: ValidationArguments) {
          return '';
        },
      },
    });
  };
};

@ValidatorConstraint({ name: 'isSixDigitNumber', async: false })
export class IsSixDigitNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const regExRule =
      /^(?!.*(\d)\1{5})(?=\d{6})(?=\d*[0-9])(?=\d*[1-9])(?=\d*[0-9])(?=\d*[1-9])(?=\d*[0-9])(?=\d*[1-9])(?!.*123456|654321)\d{6}$/;
    if (!regExRule.test(value)) {
      return false;
    }
    return true;
  }
}

export const IsSixDigitNumber = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isSixDigitNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsSixDigitNumberConstraint,
    });
  };
};
