import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { BookToStoreEntity } from './book.to.store.entity';

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

  @OneToMany(() => BookToStoreEntity, (bookToStore) => bookToStore.store)
  public bookToStores: BookToStoreEntity[];
}
