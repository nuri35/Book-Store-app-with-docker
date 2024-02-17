import { UserType } from '@/common-types/enums/type.enum';
import {
  IsCustomPhoneNumberFormat,
  IsSixDigitNumber,
} from '@/decorators/validation.decorators';
import { transformProperty } from '@/providers/transform.property';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

class BookStoreCreateDto {}
export default BookStoreCreateDto;
