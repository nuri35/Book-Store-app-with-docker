import { IsJWT, IsString, Length } from 'class-validator';
import { Optional } from 'class-validator-extended';

class VerifyEmailDto {
  @IsJWT()
  token: string;

  @Optional()
  @IsString()
  @Length(1, 256)
  deviceName?: string;
}
export default VerifyEmailDto;
