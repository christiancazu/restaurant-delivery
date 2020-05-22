import { Injectable } from '@nestjs/common';
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
    return await this._userRepository.find();
  }

  async getById(id: number): Promise<User> {
    return await this._userRepository.findOne(id);
  }
}
