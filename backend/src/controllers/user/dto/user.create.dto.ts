import { UserType } from '@/common-types/enums/type.enum';
import {
  IsCustomPhoneNumberFormat,
  IsSixDigitNumber,
} from '@/decorators/validation.decorators';
import { transformProperty } from '@/providers/transform.property';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

class UserCreateDto {
  @IsEnum(UserType)
  type: UserType;

  @IsString()
  @Length(1, 256)
  @Transform(({ value }) => transformProperty(value))
  name: string;

  @IsString()
  @Length(1, 256)
  @Transform(({ value }) => transformProperty(value))
  surname: string;

  @IsEmail()
  @Transform((property) => transformProperty(property.value, property.key))
  mail: string;

  @IsString()
  @IsCustomPhoneNumberFormat()
  phone: string;

  @IsString()
  @IsSixDigitNumber()
  password: string;
}
export default UserCreateDto;
