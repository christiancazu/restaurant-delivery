import {
  IsNumber,
  IsInt,
  IsPositive,
  IsOptional
} from 'class-validator';
import { CreateCardInput } from '@common/gql/graphql.schema.generated';

export class CreateCardInputDto implements CreateCardInput {
  @IsInt()
  @IsPositive()
  readonly initialStock: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly stock: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  readonly price: number;

  @IsInt()
  @IsPositive()
  readonly plateId: number;
}
