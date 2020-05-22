import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly _userService: UserService
  ) {}

  @Get()
  getUsers(): any {
    return this._userService.findAll();
  }
}
