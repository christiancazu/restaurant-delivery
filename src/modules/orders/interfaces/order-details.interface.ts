import { OrderCards } from 'src/modules/order-cards/order-cards.entity';
import { Order } from 'src/modules/orders/order.entity';

export interface OrderDetails {
  order?: Order,
  orderCards?: OrderCards[]
}
