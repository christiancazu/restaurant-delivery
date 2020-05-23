import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.guard';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly _userService: UserService
  ){}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  users(): Promise<User[]> {
    return this._userService.findAll();
  }
}
