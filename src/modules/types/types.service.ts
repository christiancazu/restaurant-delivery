import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from 'src/modules/types/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly _typeRepository : Repository<Type>
  ) {}

  async findAll(): Promise<Type[]> {
    return await this._typeRepository.find();
  }
}
