import {
  Resolver, Query, Mutation, Args, Subscription
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
import { PubSub } from 'graphql-subscriptions';

@Resolver('Cards')
export class CardsResolver {
  private _pubSub: PubSub

  constructor(
    private readonly _cardsService: CardsService
  ) {
    this._pubSub = new PubSub();
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => [Card])
  inCurrentDayCards(): Promise<Card[]> {
    return this._cardsService.findAllInCurrentDay();
  }

  @Mutation(() => [Card])
  @RolesRequired(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createCards(
    @CurrentUser('id') creatorUserId: number,
    @Args('createCardsInput') createCardsInput: CreateCardInputDto[]
  ) {
    const createdCards = await this._cardsService.createOrUpdateCards(createCardsInput, creatorUserId);
    this._pubSub.publish('cardsUpdated', { cardsUpdated: createdCards });
    return true;
  }

  @Mutation(() => [Card])
  @RolesRequired(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async updateCard(
    @CurrentUser('id') creatorUserId: number,
    @Args('updateCardInput') updateCardInput: CreateCardInputDto
  ) {
    const cardsUpdated = await this._cardsService.updateCard(updateCardInput, creatorUserId);
    this._pubSub.publish('cardsUpdated', { cardsUpdated });
    return true;
  }

  @Subscription('cardsUpdated')
  cardsUpdated() {
    return  this._pubSub.asyncIterator('cardsUpdated');
  }
}
