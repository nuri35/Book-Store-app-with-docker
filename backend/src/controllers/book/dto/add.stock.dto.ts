import { IsNumber, IsBoolean } from 'class-validator';

class AddStockDto {
  @IsNumber()
  storeId: number; // ve hangi magazaya

  @IsNumber()
  bookId: number; // hangı belırli kitap

  @IsNumber()
  quantity: number; // kactane eklenecek bilgisi

  @IsBoolean()
  isRemove: boolean; // eklenecek mi cıkarılacak mı
}
export default AddStockDto;
