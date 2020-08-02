import { Repository, EntityRepository } from 'typeorm';
import { OrderCards } from './order-cards.entity';

@EntityRepository(OrderCards)
export class OrderCardsRepository extends Repository<OrderCards> {}
