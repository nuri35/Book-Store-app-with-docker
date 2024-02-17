import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { UserEntity } from '@entities/user.entity';
import { BookEntity } from '@entities/book.entity';

@Entity()
export class BookStoreEntity extends BaseCustomEntity {
  //

  @ManyToMany(() => BookEntity, (book) => book.bookstores)
  @JoinTable()
  books: BookEntity[];
}
