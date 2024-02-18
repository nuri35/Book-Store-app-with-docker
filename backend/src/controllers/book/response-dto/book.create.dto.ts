import { Expose } from 'class-transformer';
import { GenreType } from '@common-types/enums/type.enum';

class BookCreateResDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  publicationYear: number;

  @Expose()
  ISBN: string;

  @Expose()
  genre: GenreType;
}

export default BookCreateResDto;
