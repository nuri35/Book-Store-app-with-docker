import { IsCustomPhoneNumberFormat } from '@/decorators/validation.decorators';
import { IsString, Length } from 'class-validator';

class BookStoreCreateDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  address: string;

  @IsCustomPhoneNumberFormat()
  phoneNumber: string;
}
export default BookStoreCreateDto;
