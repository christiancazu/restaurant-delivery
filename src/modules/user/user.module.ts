import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, UserResolver],
  controllers: [],
  exports: [UserModule]
})
export class UserModule {}
