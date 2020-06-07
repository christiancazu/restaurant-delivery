import {
  IsEmail, MinLength, IsNotEmpty, ValidationArguments
} from 'class-validator';
import { SignUpInput } from '@common/gql/graphql.schema.generated';

export class SignUpInputDto extends SignUpInput {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6, { message: (args: ValidationArguments) => `{"message":"data.errors.invalid.minLength","attrs":{"field":"password","amount":${args.constraints[0]}}}` })
  readonly password: string;
}
