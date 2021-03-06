import {
  IsEmail, MinLength, IsNotEmpty, ValidationArguments
} from 'class-validator';
import { SignInInput } from '@common/gql/graphql.schema.generated';

export class SignInInputDto implements SignInInput {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6, { message: (args: ValidationArguments) => `{ "message": "field.errors.minLength", "asserts": { "field":"password", "amount":${args.constraints[0]} }}` })
  readonly password: string;
}
