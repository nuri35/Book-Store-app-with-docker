import { IsString, IsEmail, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  IsCustomPhoneNumberFormat,
  IsSixDigitNumber,
} from '@decorators/validation.decorators';
import { transformProperty } from '@/providers/transform.property';
import { Optional } from 'class-validator-extended';

class AuthRegisterDto {
  @IsEmail()
  @Transform((property) => transformProperty(property.value, property.key))
  mail: string;

  @IsString()
  @Transform(({ value }) => transformProperty(value))
  @Length(1, 256)
  name: string;

  @IsString()
  @Transform(({ value }) => transformProperty(value))
  @Length(1, 256)
  surname: string;

  @IsCustomPhoneNumberFormat()
  @Length(1, 20)
  phone: string;

  @IsString() // 6 hanelı numeric bir şifre
  @IsSixDigitNumber()
  password: string;

  @IsString()
  @Transform(({ value }) => transformProperty(value))
  @Length(1, 256)
  title: string;

  @Optional()
  @IsString()
  @Length(1, 256)
  deviceName?: string;
}

export default AuthRegisterDto;
