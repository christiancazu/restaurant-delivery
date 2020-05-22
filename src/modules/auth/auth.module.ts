import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../users/users.service';
import { UserRepository } from '../users/user.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    AuthResolver
  ],
  exports: [AuthService]
})
export class AuthModule {}
