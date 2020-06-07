import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { RolesRequired } from '../roles/decorators/roles.decorators';
import { ROLES } from '../roles/enums/roles.enum';


@Resolver('User')
export class UserResolver {
  constructor(
    private readonly _userService: UserService
  ){}

  @RolesRequired(ROLES.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(() => [User])
  users(): Promise<User[]> {
    return this._userService.findAll();
  }
}
