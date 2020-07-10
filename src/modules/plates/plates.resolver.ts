import {
  Resolver, Query, Mutation, Args
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PlatesService } from './plates.service';
import { RolesRequired } from 'src/modules/roles/decorators/roles.decorators';
import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { Plate } from './plate.entity';
import { ROLES } from 'src/modules/roles/enums/roles.enum';
import { CreatePlateInputDto } from 'src/modules/plates/dto/create-plate.input.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';

@Resolver('Plates')
export class PlatesResolver {
  constructor(
    private readonly _platesService: PlatesService
  ){}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Plate])
  plates(): Promise<Plate[]> {
    return this._platesService.findAll();
  }

  @Mutation()
  @RolesRequired(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createPlate(
    @CurrentUser('id') creatorUserId: number,
    @Args('createPlateInput') createPlateInput: CreatePlateInputDto
  ): Promise<Plate> {
    return this._platesService.create(createPlateInput, creatorUserId);
  }
}
