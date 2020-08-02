import {
  IsInt,
  IsPositive,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { CreateOrderInput } from '@common/gql/graphql.schema.generated';

export class CreateOrderInputDto implements CreateOrderInput {
  @IsInt()
  @IsPositive()
  paymentId: number;

  @IsOptional()
  @IsString()
  paymentCode: string;

  @IsNotEmpty()
  @IsString()
  destineLatLng: string;
}
