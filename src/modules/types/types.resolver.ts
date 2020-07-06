import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { Type } from './type.entity';
import { TypesService } from './types.service';

@Resolver('Types')
export class TypesResolver {
  constructor(
    private readonly _typesService: TypesService
  ){}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Type])
  types(): Promise<Type[]> {
    return this._typesService.findAll();
  }
}
