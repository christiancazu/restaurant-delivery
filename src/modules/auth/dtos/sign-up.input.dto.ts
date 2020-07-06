import {
  ValidationArguments,
  IsEmail,
  MinLength,
  IsNotEmpty,
  MaxLength,
  IsNumberString,
  IsOptional
} from 'class-validator';
import { SignUpInput } from '@common/gql/graphql.schema.generated';
import { ASSERTS } from '@common/config/asserts';

export class SignUpInputDto implements SignUpInput {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(ASSERTS.USER.EMAIL_MIN_LENGTH)
  @MaxLength(ASSERTS.USER.EMAIL_MAX_LENGTH)
  readonly email: string;

  @IsNotEmpty()
  @MinLength(ASSERTS.USER.PASSWORD_MIN_LENGTH,
    { message: (args: ValidationArguments) => `{"message":"field.errors.minLength","asserts":{"field":"password","amount":${args.constraints[0]}}}` }
  )
  @MaxLength(ASSERTS.USER.PASSWORD_MAX_LENGTH)
  readonly password: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(ASSERTS.USER.DOCUMENT_MIN_LENGTH)
  @MaxLength(ASSERTS.USER.DOCUMENT_MAX_LENGTH)
  readonly document: string;

  @IsNotEmpty()
  @MinLength(ASSERTS.USER.FIRSTNAME_MIN_LENGTH)
  @MaxLength(ASSERTS.USER.FIRSTNAME_MAX_LENGTH)
  readonly firstname: string;

  @IsNotEmpty()
  @MinLength(ASSERTS.USER.LASTNAME_MIN_LENGTH)
  @MaxLength(ASSERTS.USER.LASTNAME_MAX_LENGTH)
  readonly lastname: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(ASSERTS.USER.PHONE_MIN_LENGTH)
  @MaxLength(ASSERTS.USER.PHONE_MAX_LENGTH)
  readonly phone: string;

  @IsOptional()
  @MaxLength(ASSERTS.USER.ADDRESS_MAX_LENGTH)
  readonly address?: string;

  @IsOptional()
  @MaxLength(ASSERTS.USER.LOCATION_LAT_LNG_MAX_LENGTH)
  readonly locationLatLng?: string;

  @IsOptional()
  @MaxLength(ASSERTS.USER.AVATAR_MAX_LENGTH)
  readonly avatar?: string;
}
