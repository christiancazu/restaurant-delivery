import { Injectable } from '@nestjs/common';
import { Vehicle } from 'src/modules/vehicles/vehicle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly _vehicleRepository : Repository<Vehicle>
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return await this._vehicleRepository.find();
  }
}
