import { IsCustomPhoneNumberFormat } from '@/decorators/validation.decorators';
import { IsEnum, IsString, Length, IsNumber } from 'class-validator';
import { GenreType } from '@/common-types/enums/type.enum';

class BookCreateDto {
  @IsString()
  @Length(3, 50)
  title: string;

  @IsString()
  @Length(3, 50)
  author: string;

  @IsNumber()
  publicationYear: number;

  @IsString()
  @Length(10, 13)
  ISBN: string;

  @IsEnum(GenreType)
  genre: GenreType;

  @IsNumber()
  storeId: number;
}
export default BookCreateDto;
