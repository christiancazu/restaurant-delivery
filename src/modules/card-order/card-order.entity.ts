import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Card } from '../card/card.entity';

@Entity('card-order')
export class CardOrder extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order,{ nullable: false, })
  @JoinColumn({ name: 'order_id', })
  order: Order;

  @ManyToOne(() => Card,{ nullable: false, })
  @JoinColumn({ name: 'card_id', })
  card: Card;

  @Column({
    type: 'int',
    nullable: false,
  })
  amount: number

  @Column({
    type: 'decimal',
    nullable: false,
  })
  subtotal: number
}

