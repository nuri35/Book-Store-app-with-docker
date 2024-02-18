import { BaseCustomEntity } from '@entities/base.entity';
import { Column, ManyToOne, Entity } from 'typeorm';
import { BookEntity } from './book.entity';
import { StoreEntity } from './store.entity';

@Entity()
export class BookToStoreEntity extends BaseCustomEntity {
  @Column()
  public bookId: number;

  @Column()
  public storeId: number;

  @Column()
  public quantity: number; // Ekstra sütun, örneğin kitabın mağazadaki miktarı gibi

  @ManyToOne(() => BookEntity, (book) => book.bookToStores)
  public book: BookEntity;

  @ManyToOne(() => StoreEntity, (store) => store.bookToStores)
  public store: StoreEntity;
}
