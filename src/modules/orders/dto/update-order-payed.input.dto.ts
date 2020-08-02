import {
  IsInt,
  IsPositive,
  IsBoolean
} from 'class-validator';
import { UpdateOrderPayedInput } from '@common/gql/graphql.schema.generated';

export class UpdateOrderPayedInputDto implements UpdateOrderPayedInput {
  @IsInt()
  @IsPositive()
  orderId: number

  @IsBoolean()
  payed: boolean
}
