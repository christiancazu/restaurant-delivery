import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from 'src/modules/orders/order.repository';
import { OrderCardsRepository } from 'src/modules/order-cards/order-cards.repository';
import { CardRepository } from 'src/modules/cards/card.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository, OrderCardsRepository, CardRepository])],
  providers: [OrdersResolver, OrdersService]
})
export class OrdersModule {}
