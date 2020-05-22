import {
  Resolver, Mutation, Args
} from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Session } from 'src/graphql.schema.generated';
import { SignInInputDto } from './dtos/sign-in.input.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly _authService: AuthService
  ){}

  @Mutation(() => Session)
  signIn(
    @Args('signInInput') { email, password }: SignInInputDto
  ): Promise<Session> {
    return this._authService.signIn({
      email,
      password
    });
  }
}
