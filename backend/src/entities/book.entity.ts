import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';

import { GenreType } from '@/common-types/enums/type.enum';
import { BookToStoreEntity } from './book.to.store.entity';

@Entity()
@Unique(['ISBN'])
export class BookEntity extends BaseCustomEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationYear: number;

  @Column()
  ISBN: string;

  @Column({
    type: 'enum',
    enum: GenreType,
    nullable: false,
  })
  genre: GenreType;

  @OneToMany(() => BookToStoreEntity, (bookToStore) => bookToStore.book)
  public bookToStores: BookToStoreEntity[];
}
