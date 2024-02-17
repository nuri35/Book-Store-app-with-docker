import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { StoreEntity } from '@/entities/store.entity';

@Entity()
export class BookEntity extends BaseCustomEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationYear: number;

  @Column()
  ISBN: string;

  @Column()
  genre: string;

  @ManyToMany(() => StoreEntity)
  @JoinTable()
  stores: StoreEntity[];
}
