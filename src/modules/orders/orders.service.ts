import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, MoreThan } from 'typeorm';
import { CreateOrderInputDto } from './dto/create-order.input.dto';
import { Payment } from 'src/modules/payments/payment.entity';
import { User } from 'src/modules/users/user.entity';
import { CreateOrderCardInputDto } from '../order-cards/dto/create-order-card.input.dto';
import { Order } from 'src/modules/orders/order.entity';
import { Card } from 'src/modules/cards/card.entity';
import { OrderCards } from 'src/modules/order-cards/order-cards.entity';
import { DateTime } from 'luxon';
import { OrderDetails } from './interfaces/order-details.interface';
import { UpdateOrderByAdminInputDto } from 'src/modules/orders/dto/update-order-by-admin.input.dto';
import { UpdateOrderByClientInputDto } from 'src/modules/orders/dto/update-order-by-client.input.dto';
import { Rating } from 'src/modules/ratings/rating.entity';
import { UpdateOrderDeliveryInputDto } from 'src/modules/orders/dto/update-order-delivery.input.dto';
import { Vehicle } from 'src/modules/vehicles/vehicle.entity';
import { UpdateOrderPayedInputDto } from 'src/modules/orders/dto/update-order-payed.input.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly _orderRepository : Repository<Order>,

    @InjectRepository(OrderCards)
    private readonly _orderCardsRepository: Repository<OrderCards>,

    @InjectRepository(Card)
    private readonly _cardRepository: Repository<Card>
  ) {}

  async findAll(): Promise<OrderDetails[]> {
    const orders = await this._orderRepository
      .find({
        relations: ['client', 'dealer', 'vehicle', 'payment', 'status', 'rating'],
        order: { id: 'DESC' }
      });

    if (!orders.length) {
      return [];
    }

    const orderCards = await Promise.all(
      orders.map(order => this._orderCardsRepository
        .find({
          where: { order: { id: order.id } },
          relations: ['card', 'card.plate']
        })
      )
    );

    const ordersDetails: OrderDetails[] =
      orders.map((order, i) => ({
        order,
        orderCards: orderCards[i]
      })
      );

    return ordersDetails;
  }

  async findAllByClient(clientId: number): Promise<OrderDetails[]> {
    const orders = await this._orderRepository
      .find({
        where: { client: { id: clientId } },
        relations: ['client', 'dealer', 'vehicle', 'payment', 'status', 'rating'],
        order: { id: 'DESC' }
      });

    if (!orders.length) {
      return [];
    }

    const orderCards = await Promise.all(
      orders.map(order => this._orderCardsRepository
        .find({
          where: { order: { id: order.id } },
          relations: ['card', 'card.plate']
        })
      )
    );

    const ordersDetails: OrderDetails[] =
      orders.map((order, i) => ({
        order,
        orderCards: orderCards[i]
      })
      );

    return ordersDetails;
  }

  /** TODO: there should validate available cards stocks before to discount */
  async create(
    orderDto: CreateOrderInputDto,
    orderCardsDto: CreateOrderCardInputDto[],
    clientId: number): Promise<boolean> {

    const newOrderCards: OrderCards[] = [];
    const todayLocalTimeISOString = DateTime.local().toISODate();

    try {
      const order: Order = this._orderRepository.create({
        ...orderDto,
        payment: new Payment(orderDto.paymentId),
        client: new User(clientId)
      });

      const orderCreated = await order.save();

      const wantedCards: Card[] = await this._cardRepository
        .find({
          where: {
            id: In([orderCardsDto.map(o => o.cardId)]),
            createdAt: MoreThan(todayLocalTimeISOString),
            enabled: true
          }
        });

      orderCardsDto.forEach(orderCardDto => {
        const newOrderCard = new OrderCards();
        newOrderCard.order = new Order(orderCreated.id);
        newOrderCard.amount = orderCardDto.amount;
        newOrderCard.card = new Card(orderCardDto.cardId);

        const wantedCard = wantedCards.find(o => o.id === orderCardDto.cardId);

        // subtotal = card price * amount
        newOrderCard.subtotal = wantedCard.price * newOrderCard.amount;
        wantedCard.stock -= newOrderCard.amount;

        newOrderCards.push(newOrderCard);

        // acc order total
        orderCreated.total += newOrderCard.subtotal;
      });

      await this._orderRepository.save(orderCreated);

      // saving order cards
      await Promise.all(newOrderCards.map(newOrderCard => this._orderCardsRepository.save(newOrderCard)));

      // updating cards stock after create order cards
      await Promise.all(wantedCards.map(wantedCard => this._cardRepository.save(wantedCard)));

      return true;

    } catch (error) {
      throw new BadRequestException('order.errors.fail');
    }
  }

  async updateByAdmin(dto: UpdateOrderByAdminInputDto): Promise<Order> {
    const orderToUpdate: Order = await this._orderRepository
      .findOne(dto.orderId, { relations: ['status'] });

    orderToUpdate.status.id = dto.statusId;

    return await this._orderRepository.save(orderToUpdate);
  }

  async updateByClient(dto: UpdateOrderByClientInputDto, clientId: number): Promise<Order> {
    const orderToUpdate: Order = await this._orderRepository
      .findOne({
        where: {
          id: dto.orderId,
          client: { id: clientId }
        },
        relations: ['rating']
      });

    if (!orderToUpdate) {
      throw new UnauthorizedException('auth.errors.clientOrder');
    }

    orderToUpdate.rating = new Rating(dto.ratingId);
    orderToUpdate.ratingDescription = dto.ratingDescription;

    await this._orderRepository.save(orderToUpdate);

    return await this._orderRepository.findOne(dto.orderId, { relations: ['rating'] });
  }

  async updateDelivery(dto: UpdateOrderDeliveryInputDto): Promise<Order> {
    const orderToUpdate: Order = await this._orderRepository
      .findOne(dto.orderId, { relations: ['dealer', 'vehicle'] });

    orderToUpdate.dealer = new User(dto.dealerId);
    orderToUpdate.vehicle = new Vehicle(dto.vehicleId);

    return await this._orderRepository.save(orderToUpdate);
  }

  async updatePayed(dto: UpdateOrderPayedInputDto): Promise <Order> {
    const orderToUpdate: Order = await this._orderRepository
      .findOne(dto.orderId);

    orderToUpdate.payed = dto.payed;

    return await this._orderRepository.save(orderToUpdate);
  }
}
