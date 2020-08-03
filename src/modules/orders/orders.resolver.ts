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
import { UpdateOrderByAdminInputDto } from 'src/modules/orders/dto/update-order-by-admin.input.dto';
import { UpdateOrderByClientInputDto } from 'src/modules/orders/dto/update-order-by-client.input.dto';
import { UpdateOrderDeliveryInputDto } from 'src/modules/orders/dto/update-order-delivery.input.dto';
import { UpdateOrderPayedInputDto } from 'src/modules/orders/dto/update-order-payed.input.dto';

@Resolver('Orders')
export class OrdersResolver {

  constructor(
    private readonly _ordersService: OrdersService
  ) {}

  @Query()
  @RolesRequired(ROLES.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async orderDetailsByClient(
    @CurrentUser('id') clientId: number
  ) {
    return this._ordersService.findAllByClient(clientId);
  }

  @Query()
  @RolesRequired(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async orderDetails() {
    return this._ordersService.findAll();
  }

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

  @Mutation()
  @RolesRequired(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async updateOrderByAdmin(
    @Args('updateOrderByAdminInput') updateOrderByAdminInput: UpdateOrderByAdminInputDto
  ): Promise<Order> {
    return this._ordersService.updateByAdmin(updateOrderByAdminInput);
  }

  @Mutation()
  @RolesRequired(ROLES.CLIENT)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async updateOrderByClient(
    @Args('updateOrderByClientInput') updateOrderByClientInput: UpdateOrderByClientInputDto,
    @CurrentUser('id') clientId: number
  ): Promise<Order> {
    return this._ordersService.updateByClient(updateOrderByClientInput, clientId);
  }

  @Mutation()
  @RolesRequired(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async updateOrderDelivery(
    @Args('updateOrderDeliveryInput') updateOrderDeliveryInput: UpdateOrderDeliveryInputDto
  ): Promise<Order> {
    return this._ordersService.updateDelivery(updateOrderDeliveryInput);
  }

  @Mutation()
  @RolesRequired(ROLES.ADMIN, ROLES.SUPER_ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async updateOrderPayed(
    @Args('updateOrderPayedInput') updateOrderPayedInput: UpdateOrderPayedInputDto
  ): Promise<Order> {
    return this._ordersService.updatePayed(updateOrderPayedInput);
  }
}
