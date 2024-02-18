import { Expose } from 'class-transformer';

class StoreResDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  phoneNumber: string;
}

export default StoreResDto;
