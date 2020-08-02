import {
  IsInt,
  IsPositive
} from 'class-validator';
import { UpdateOrderByAdminInput } from '@common/gql/graphql.schema.generated';

export class UpdateOrderByAdminInputDto implements UpdateOrderByAdminInput {
  @IsInt()
  @IsPositive()
  orderId: number;

  @IsInt()
  @IsPositive()
  statusId: number;
}
