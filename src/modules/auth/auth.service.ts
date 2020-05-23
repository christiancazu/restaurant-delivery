import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '../users/users.service';
import { User } from '../users/user.entity';
import { SignInInputDto } from './dtos/sign-in.input.dto';
import { SignUpInputDto } from './dtos/sign-up.input.dto';
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

  private signJWTPayload(user: Partial<User>): string {
    return sign(
      { user },
      this._configService.get('JWT_SECRET'),
      { expiresIn: '7d' }
    );
  }

  async validateUserAuth({ user: { id } }: any): Promise<User> {
    const user = await this._userService.findById(id);
    if (!user) {
      throw Error('auth.errors.authentication');
    }
    return user;
  }

  async signIn({ email, password }: SignInInputDto): Promise<Session> {
    const user = await this._userRepository.findOne({ email });

    if (!user) {
      throw new UnprocessableEntityException('auth.errors.credentials');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new UnprocessableEntityException('auth.errors.credentials');
    }

    return this.provideSession(user);
  }

  async signUp(data: SignUpInputDto): Promise<Session> {
    let user = await this._userRepository.findOne({ email: data.email });

    if (user) {
      throw new UnprocessableEntityException('auth.errors.exists');
    }

    user = this._userRepository.create(data);
    await this._userRepository.save(user);

    return this.provideSession(user);
  }

  private async provideSession(user: User) {
    delete user['password'];
    return {
      user,
      token: this.signJWTPayload(user)
    };
  }

  async getSession(userId: number): Promise<Session> {
    const user = await this._userRepository.findOne(userId);

    if (!user) {
      throw new UnprocessableEntityException('auth.errors.exists');
    }

    return this.provideSession(user);
  }
}
