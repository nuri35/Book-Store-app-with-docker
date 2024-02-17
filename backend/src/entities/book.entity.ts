import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { BookStoreEntity } from '@entities/book.store.entity';

@Entity()
export class BookEntity extends BaseCustomEntity {
  @ManyToMany(() => BookStoreEntity, (bookstore) => bookstore.books)
  @JoinTable()
  bookstores: BookStoreEntity[];
}
