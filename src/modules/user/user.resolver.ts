import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly _userService: UserService
  ){}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this._userService.findAll();
  }
}
