import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, Min } from 'class-validator';

class BookStoreQueryDto {
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  limit: number;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  page: number;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  storeToBook: boolean; // eger true ise tum magazaları ve her bırının altındakı kıtapları getırır
}

export default BookStoreQueryDto;
