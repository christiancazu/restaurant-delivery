import {
  Resolver, Mutation, Args, Query
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Session } from 'src/graphql.schema.generated';
import { SignInInputDto } from './dtos/sign-in.input.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { GqlAuthGuard } from './guards/gql.guard';
import { UserService } from '../users/users.service';
import { SignUpInputDto } from './dtos/sign-up.input.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
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

  @Mutation(() => Session)
  signUp(
    @Args('signUpInput') { email, password }: SignUpInputDto
  ): Promise<Session> {
    return this._authService.signUp({
      email,
      password
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Session)
  me(
    @CurrentUser('id') currentUserId: number
  ): Promise<Session> {
    return this._authService.getSession(currentUserId);
  }
}
