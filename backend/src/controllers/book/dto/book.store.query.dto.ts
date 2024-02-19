import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

class BookStoreQueryDto {
  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  limit: number;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1)
  page: number;
}

export default BookStoreQueryDto;
