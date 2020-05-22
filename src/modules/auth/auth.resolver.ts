import {
  Resolver, Mutation, Args, Query
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Session } from 'src/graphql.schema.generated';
import { SignInInputDto } from './dtos/sign-in.input.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { GqlAuthGuard } from './gql.guard';
import { UserService } from '../user/user.service';

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

  @UseGuards(GqlAuthGuard)
  @Query(() => Session)
  async me(
    @CurrentUser('id') currentUserId: number
  ): Promise<Session> {
    const user = await this._userService.findById(currentUserId);
    return {
      user,
      token: await this._authService.signJWTPayload(user)
    };
  }
}
