import {
  IsInt,
  IsPositive
} from 'class-validator';
import { CreateOrderCardInput } from '@common/gql/graphql.schema.generated';

export class CreateOrderCardInputDto implements CreateOrderCardInput {
  @IsInt()
  @IsPositive()
  cardId: number;

  @IsInt()
  @IsPositive()
  amount: number;
}
