import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleRepository } from 'src/modules/vehicles/vehicle.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleRepository])],
  providers: [VehiclesService, VehiclesResolver]
})
export class VehiclesModule {}
