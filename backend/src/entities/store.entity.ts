import { Entity, Column, Unique } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';

@Entity()
@Unique(['phoneNumber'])
export class StoreEntity extends BaseCustomEntity {
  //

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;
}
