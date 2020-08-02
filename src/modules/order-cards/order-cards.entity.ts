import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Card } from '../cards/card.entity';

@Entity('order_cards')
export class OrderCards extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'cardId' })
  card: Card;

  @Column({ type: 'int' })
  amount: number

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2
  })
  subtotal: number
}

