import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';

@Resolver('Categories')
export class CategoriesResolver {
  constructor(
    private readonly _categoriesService: CategoriesService
  ){}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return this._categoriesService.findAll();
  }
}
