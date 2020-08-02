import {
  IsInt,
  IsPositive
} from 'class-validator';
import { UpdateOrderDeliveryInput } from '@common/gql/graphql.schema.generated';

export class UpdateOrderDeliveryInputDto implements UpdateOrderDeliveryInput {
  @IsInt()
  @IsPositive()
  orderId: number;

  @IsInt()
  @IsPositive()
  dealerId: number;

  @IsInt()
  @IsPositive()
  vehicleId: number;
}
