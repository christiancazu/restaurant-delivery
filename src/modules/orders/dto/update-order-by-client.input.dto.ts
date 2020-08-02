import {
  IsInt,
  IsPositive,
  IsOptional,
  Length
} from 'class-validator';
import { UpdateOrderByClientInput } from '@common/gql/graphql.schema.generated';
import { ASSERTS } from '@common/config/asserts.config';

export class UpdateOrderByClientInputDto implements UpdateOrderByClientInput {
  @IsInt()
  @IsPositive()
  orderId: number;

  @IsInt()
  @IsPositive()
  ratingId: number;

  @IsOptional()
  @Length(0, ASSERTS.ORDER.RATING_DESCRIPTION)
  ratingDescription: string
}
