import { UserType, userLoginType } from '@common-types/enums/type.enum';

import { Expose, Transform, Type } from 'class-transformer';

export class HumanResDto {
  @Expose()
  phone: string;
}

class InitialResDto {
  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose({
    name: 'I',
  })
  @Type(() => HumanResDto)
  detail: HumanResDto;

  @Expose()
  type: UserType;

  @Expose()
  publicId: number;

  @Expose()
  mail: string;

  @Expose()
  login: userLoginType;
}

export default InitialResDto;
