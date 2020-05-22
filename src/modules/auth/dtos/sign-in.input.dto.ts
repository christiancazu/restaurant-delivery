import {
  IsEmail, MinLength, IsNotEmpty
} from 'class-validator';
import { SignInInput } from 'src/graphql.schema.generated';

export class SignInInputDto extends SignInInput {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
