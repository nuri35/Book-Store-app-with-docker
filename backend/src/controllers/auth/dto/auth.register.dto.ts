import { IsEnum, IsString, IsEmail, Length, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserType } from '@common-types/enums/type.enum';

// import {
//   IsCustomPhoneNumberFormat,
//   IsEmailOrUserCode,
//   IsSixDigitNumber,
//   IsTaxNumberOrIdNumber,
//   IsEitherIdtaxNumberOrLoginName,
//   MemberTypeControl,
// } from '@decorators/validation.decorators';
// import { transformProperty } from '@/providers/transform.property';
import { Optional } from 'class-validator-extended';

class AuthRegisterDto {
  //   @Optional()
  //   @IsTaxNumberOrIdNumber<MemberRegisterDto>((s) => s.memberType)
  //   idtaxNumber?: string;
  //   @Optional()
  //   @IsEmailOrUserCode()
  //   loginName?: string;
  //   @IsEmail()
  //   @Transform((property) => transformProperty(property.value, property.key))
  //   mail: string;
  //   @IsString()
  //   @Transform(({ value }) => transformProperty(value))
  //   @Length(1, 256)
  //   name: string;
  //   @IsString()
  //   @Transform(({ value }) => transformProperty(value))
  //   @Length(1, 256)
  //   surname: string;
  //   @Optional()
  //   @IsString()
  //   @Transform(({ value }) => transformProperty(value))
  //   @Length(1, 256)
  //   companyName?: string;
  //   @IsString()
  //   @Transform(({ value }) => transformProperty(value))
  //   @Length(1, 256)
  //   title: string;
  //   @Optional()
  //   @IsString()
  //   @Transform(({ value }) => transformProperty(value))
  //   @Length(1, 256)
  //   city?: string;
  //   @IsCustomPhoneNumberFormat()
  //   @Length(1, 256)
  //   phone: string;
  //   @IsString()
  //   @IsSixDigitNumber()
  //   password: string;
  //   @Optional()
  //   @IsString()
  //   @Length(1, 256)
  //   taxOffice?: string;
  //   @Optional()
  //   @IsString()
  //   @Length(1, 256)
  //   fax?: string;
  //   @Optional()
  //   @IsString()
  //   @Length(1, 256)
  //   deviceName?: string;
}

export default AuthRegisterDto;
