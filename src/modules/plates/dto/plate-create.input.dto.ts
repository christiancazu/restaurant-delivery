import {
  MinLength,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumber
} from 'class-validator';
import { PlateCreateInput } from '@common/gql/graphql.schema.generated';
import { ASSERTS } from '@common/config/asserts.config';

export class PlateCreateInputDto implements PlateCreateInput {
  @IsNotEmpty()
  @MinLength(ASSERTS.PLATE.NAME_MIN_LENGTH)
  @MaxLength(ASSERTS.PLATE.NAME_MAX_LENGTH)
  readonly name: string;


  @IsOptional()
  @MaxLength(ASSERTS.PLATE.DESCRIPTION_MAX_LENGTH)
  readonly description: string;

  @IsOptional()
  @MaxLength(ASSERTS.PLATE.AVATAR_MAX_LENGTH)
  readonly avatar: string;

  @IsOptional()
  @IsNumber()
  readonly categoryId: number;

  @IsNumber()
  readonly typeId: number;
}
