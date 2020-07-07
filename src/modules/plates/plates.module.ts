import { Module } from '@nestjs/common';
import { PlatesService } from './plates.service';
import { PlatesResolver } from './plates.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateRepository } from './plate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlateRepository])],
  providers: [PlatesService, PlatesResolver],
  exports: [PlatesModule]
})
export class PlatesModule {}
