import { UseGuards } from '@nestjs/common';
import {
  Args, Mutation, Query, Resolver, Subscription
} from '@nestjs/graphql';
import { CreatePlateInputDto } from 'src/modules/plates/dto/create-plate.input.dto';
import { RolesRequired } from 'src/modules/roles/decorators/roles.decorators';
import { ROLES } from 'src/modules/roles/enums/roles.enum';
import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UpdatePlateInputDto } from './dto/update-plate.input.dto';
import { Plate } from './plate.entity';
import { PlatesService } from './plates.service';

@Resolver('Plates')
export class PlatesResolver {

  constructor(
    private readonly _platesService: PlatesService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Plate])
  plates(): Promise<Plate[]> {
    return this._platesService.findAll();
  }

  @Mutation()
  @RolesRequired(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createPlate(
    @CurrentUser('id') creatorUserId: number,
    @Args('createPlateInput') createPlateInput: CreatePlateInputDto
  ): Promise<Plate> {
    return await this._platesService.create(createPlateInput, creatorUserId);
  }

  @Mutation()
  @RolesRequired(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  updatePlate(
    @CurrentUser('id') updaterUserId: number,
    @Args('updatePlateInput') updatePlateInput: UpdatePlateInputDto
  ): Promise<Plate> {
    return this._platesService.update(updatePlateInput, updaterUserId);
  }
}
