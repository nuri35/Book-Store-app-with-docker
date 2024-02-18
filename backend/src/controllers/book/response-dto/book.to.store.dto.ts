import { Expose } from 'class-transformer';

class BookToStoreResDto {
  @Expose()
  quantity: number;

  @Expose()
  bookId: number;

  @Expose()
  storeId: number;
}

export default BookToStoreResDto;
