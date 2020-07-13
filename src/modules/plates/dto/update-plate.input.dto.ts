import {
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  IsBoolean
} from 'class-validator';
import { UpdatePlateInput } from '@common/gql/graphql.schema.generated';
import { ASSERTS } from '@common/config/asserts.config';

export class UpdatePlateInputDto implements UpdatePlateInput {
  @IsNumber()
  readonly id: number;

  @IsOptional()
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

  @IsOptional()
  @IsNumber()
  readonly typeId: number;

  @IsOptional()
  @IsBoolean()
  readonly enabled: boolean;
}
