import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, UserResolver],
  controllers: [],
  exports: [UsersModule]
})
export class UsersModule {}
