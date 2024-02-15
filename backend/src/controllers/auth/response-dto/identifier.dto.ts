import { Expose, Transform, Type } from 'class-transformer';

class IdentifierResDto {
  @Expose()
  publicId: number;
}

export default IdentifierResDto;
