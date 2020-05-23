import {
  IsEmail, MinLength, IsNotEmpty, ValidationArguments
} from 'class-validator';
import { SignInInput } from 'src/graphql.schema.generated';

export class SignInInputDto extends SignInInput {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6, { message: (args: ValidationArguments) => `{"message":"data.errors.invalid.minLength","attrs":{"field":"password","amount":${args.constraints[0]}}}` })
  readonly password: string;
}
