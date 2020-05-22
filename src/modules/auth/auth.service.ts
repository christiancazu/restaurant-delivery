import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '../users/users.service';
import { User } from '../users/user.entity';
import { SignInInputDto } from './dtos/sign-in.input.dto';
import { Session } from 'src/graphql.schema.generated';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository : Repository<User>,
    private readonly _userService: UserService,
    private readonly _configService: ConfigService
  ) {}

  async signJWTPayload(user: Partial<User>): Promise<string> {
    return await sign(
      { user: { id: user.id } },
      this._configService.get('JWT_SECRET'),
      { expiresIn: '7d' }
    );
  }

  async validateUserAuth({ id }: Partial<User>): Promise<User> {
    const user = await this._userService.findById(id);
    if (!user) {
      throw Error('auth.errors.authentication');
    }
    return user;
  }

  async signIn({ email, password }: SignInInputDto): Promise<Session> {
    const user = await this._userRepository.findOne({
      email,
      password
    });

    if (!user) {
      throw new UnprocessableEntityException('data.errors.invalid');
    }

    delete user['password'];

    return {
      user,
      token: await this.signJWTPayload(user)
    };
  }
}
