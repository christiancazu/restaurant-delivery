import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository : Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this._userRepository.find({ relations: ['roles'] });
  }

  async findById(id: number): Promise<User> {
    const user = await this._userRepository.findOne(id);

    if(!user) {
      throw new NotFoundException('user.errors.notFound');
    }

    delete user['password'];

    return user;
  }
}
