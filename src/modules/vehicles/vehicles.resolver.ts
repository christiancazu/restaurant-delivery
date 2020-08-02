import { Resolver, Query } from '@nestjs/graphql';
import { VehiclesService } from 'src/modules/vehicles/vehicles.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql.guard';
import { RolesGuard } from 'src/modules/roles/guards/roles.guard';
import { ROLES } from 'src/modules/roles/enums/roles.enum';
import { RolesRequired } from 'src/modules/roles/decorators/roles.decorators';
import { Vehicle } from 'src/modules/vehicles/vehicle.entity';

@Resolver('Vehicles')
export class VehiclesResolver {

  constructor(
    private readonly _vehiclesService: VehiclesService
  ) {}

  @RolesRequired(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [Vehicle])
  vehicles(): Promise<Vehicle[]> {
    return this._vehiclesService.findAll();
  }
}
