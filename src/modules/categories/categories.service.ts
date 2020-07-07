import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly _categoryRepository : Repository<Category>
  ) {}

  async findAll(): Promise<Category[]> {
    return await this._categoryRepository.find();
  }
}
