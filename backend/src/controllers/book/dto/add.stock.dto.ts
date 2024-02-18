import { IsNumber } from 'class-validator';

class AddStockDto {
  @IsNumber()
  storeId: number; // ve hangi magazaya

  @IsNumber()
  bookId: number; // hangı belırli kitap

  @IsNumber()
  quantity: number; // kactane eklenecek bilgisi
}
export default AddStockDto;
