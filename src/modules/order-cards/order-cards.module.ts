import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCardsRepository } from './order-cards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderCardsRepository])],
  providers: [],
  exports: [OrderCardsModule]
})
export class OrderCardsModule {}
