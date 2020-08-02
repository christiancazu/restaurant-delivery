import { Module } from '@nestjs/common';
import { CardsResolver } from './cards.resolver';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRepository } from './card.repository';
import { PlateRepository } from 'src/modules/plates/plate.repository';
import { PlatesService } from 'src/modules/plates/plates.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardRepository, PlateRepository])],
  providers: [CardsResolver, CardsService, PlatesService],
  exports: [CardsModule]

})
export class CardsModule {}
