import {
  Injectable, UnprocessableEntityException, UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '../users/users.service';
import { User } from '../users/user.entity';
import { SignInInputDto } from './dtos/sign-in.input.dto';
import { SignUpInputDto } from './dtos/sign-up.input.dto';
import { Session } from '@common/gql/graphql.schema.generated';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { ROLES } from '../roles/enums/roles.enum';
import { Role } from '../roles/role.entity';

import { getConnection } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository : Repository<User>,
    private readonly _userService: UserService,
    private readonly _configService: ConfigService
  ) {}

  private signJWTPayload(user: Partial<User>): string {
    const userJWTPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(role => role.name)
    };

    return sign(
      userJWTPayload,
      this._configService.get('JWT_SECRET'),
      { expiresIn: '7d' }
    );
  }

  async validateUserAuth(payload: Partial<User>): Promise<any> {
    const user = await this._userService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException('auth.errors.authentication');
    }
    return payload;
  }

  async signIn({ email, password }: SignInInputDto): Promise<Session> {
    const user = await this._userRepository.findOne({
      where: { email },
      relations: ['roles']
    });

    if (!user) {
      throw new UnprocessableEntityException('auth.errors.credentials');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new UnprocessableEntityException('auth.errors.credentials');
    }

    return this.provideSession(user);
  }

  async signUp(signUpInput: SignUpInputDto): Promise<Session> {
    let user: User = await this._userRepository.findOne({ where: { email: signUpInput.email } });

    if (user) {
      throw new UnprocessableEntityException('auth.errors.exists.email');
    }

    user = await this._userRepository.findOne({ where: { document: signUpInput.document } });

    if (user) {
      throw new UnprocessableEntityException('auth.errors.exists.document');
    }

    user = await this._userRepository.findOne({ where: { phone: signUpInput.phone } });

    if (user) {
      throw new UnprocessableEntityException('auth.errors.exists.phone');
    }

    user = this._userRepository.create(signUpInput);

    const roleRepository = getConnection().getRepository(Role);

    const defaultRole = await roleRepository.findOne({ where: { name: ROLES.CLIENT } });

    user.roles = [defaultRole];

    const userSaved = await this._userRepository.save(user);

    return this.provideSession(userSaved);
  }

  async getSession(userId: number): Promise<Session> {
    const user = await this._userRepository.findOne({
      where: { id: userId },
      relations: ['roles']
    });

    if (!user) {
      throw new UnprocessableEntityException('auth.errors.exists');
    }

    return this.provideSession(user);
  }

  private provideSession(user: User): Session {
    delete user['password'];
    return {
      user,
      token: this.signJWTPayload(user)
    };
  }
}
