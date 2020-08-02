import {
  Resolver, Mutation, Query, Args
} from '@nestjs/graphql';
import { OrdersService } from 'src/modules/orders/orders.service';
import { RolesRequired } from 'src/modules/roles/decorators/roles.decorators';
import { ROLES } from 'src/modules/roles/enums/roles.enum';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { CreateOrderInputDto } from 'src/modules/orders/dto/create-order.input.dto';
import { CreateOrderCardInputDto } from 'src/modules/order-cards/dto/create-order-card.input.dto';
import { Order } from 'src/modules/orders/order.entity';

@Resolver('Orders')
export class OrdersResolver {

  constructor(
    private readonly _ordersService: OrdersService
  ) {}

  @Mutation()
  @RolesRequired(ROLES.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInputDto,
    @Args('createOrderCardsInput') createOrderCardsInput: CreateOrderCardInputDto[],
    @CurrentUser('id') clientId: number
  ): Promise<boolean> {
    return this._ordersService.create(createOrderInput, createOrderCardsInput, clientId);
  }

  @Query()
  @RolesRequired(ROLES.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async orderDetailsByClient(
    @CurrentUser('id') clientId: number
  ) {
    return this._ordersService.findAllByClient(clientId);
  }
}
