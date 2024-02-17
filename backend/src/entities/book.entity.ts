import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { StoreEntity } from '@entities/book.store.entity';

@Entity()
export class BookEntity extends BaseCustomEntity {
  @ManyToMany(() => StoreEntity)
  @JoinTable()
  stores: StoreEntity[];
}
