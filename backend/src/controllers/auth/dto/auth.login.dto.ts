import { transformProperty } from '@/providers/transform.property';
import { IsSixDigitNumber } from '@decorators/validation.decorators';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

class AuthLoginDto {
  @IsEmail()
  @Transform((property) => transformProperty(property.value, property.key))
  userName: string;

  @IsString()
  @IsSixDigitNumber()
  userPassword: string;
}
export default AuthLoginDto;
