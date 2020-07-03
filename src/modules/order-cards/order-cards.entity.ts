import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Card } from '../card/card.entity';

@Entity('order_cards')
export class OrderCards extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column({ type: 'int' })
  amount: number

  @Column({ type: 'decimal' })
  subtotal: number
}

