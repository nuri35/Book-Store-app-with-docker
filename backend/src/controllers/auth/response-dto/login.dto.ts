import { Expose, Transform, Type } from 'class-transformer';
import { UserType } from '@common-types/enums/type.enum';

type AllowedKeys = 'token';

export class HumanResDto {
  @Expose()
  phone: string;
}

class LoginResDto {
  token?: string;

  addCustomProperty = (propertyName: AllowedKeys, propertyValue: any): this => {
    this[propertyName] = propertyValue;
    return this;
  };

  @Expose()
  type: UserType;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose()
  publicId: number;

  @Expose({
    name: 'I',
  })
  @Type(() => HumanResDto)
  detail: HumanResDto;
}

export default LoginResDto;
