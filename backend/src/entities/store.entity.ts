import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';

@Entity()
export class StoreEntity extends BaseCustomEntity {
  //

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  openingHours: string;
}
