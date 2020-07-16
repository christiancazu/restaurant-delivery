import {
  Resolver, Query, Mutation, Args
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { RolesRequired } from '../roles/decorators/roles.decorators';
import { ROLES } from '@common/config/roles.config';
import { RolesGuard } from 'src/modules/roles/guards/roles.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateCardInputDto } from './dto/create-card.dto';

@Resolver('Cards')
export class CardsResolver {
  constructor(
    private readonly _cardsService: CardsService
  ) {}

  // @UseGuards(GqlAuthGuard)
  @Query(() => [Card])
  inCurrentDayCards(): Promise<Card[]> {
    return this._cardsService.findAllInCurrentDay();
  }

  @Mutation()
  @RolesRequired(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createCards(
    @CurrentUser('id') creatorUserId: number,
    @Args('createCardsInput') createCardsInput: CreateCardInputDto[]
  ) {
    return this._cardsService.createOrUpdate(createCardsInput, creatorUserId);
  }
}
