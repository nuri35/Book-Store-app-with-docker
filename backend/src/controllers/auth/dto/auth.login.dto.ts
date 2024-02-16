import { transformProperty } from '@/providers/transform.property';
import { IsSixDigitNumber } from '@decorators/validation.decorators';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

class AuthLoginDto {
  @IsEmail()
  @Transform((property) => transformProperty(property.value, property.key))
  userName: string;

  @IsString()
  @IsSixDigitNumber()
  userPassword: string;

  @IsString()
  @Length(1, 256)
  deviceName: string;

  @IsString()
  @Length(1, 256)
  deviceModel: string;
}
export default AuthLoginDto;
