import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plate } from './plate.entity';
import { Repository } from 'typeorm';
import { PlateCreateInputDto } from './dto/plate-create.input.dto';
import { User } from 'src/modules/users/user.entity';
import { Type } from '../types/type.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class PlatesService {
  constructor(
    @InjectRepository(Plate)
    private readonly _plateRepository : Repository<Plate>
  ) {}

  async findAll(): Promise<Plate[]> {
    return await this._plateRepository.find({ relations: ['updater', 'category', 'type'] });
  }

  async create(dto: PlateCreateInputDto, creatorUserId: number): Promise<Plate> {
    let plate = await this._plateRepository.findOne({ where: { name: dto.name } });

    if (plate) {
      throw new UnprocessableEntityException('plate.errors.exists.name');
    }

    plate = this._plateRepository.create({
      ...dto,
      type: new Type(dto.typeId),
      category: new Category(dto.categoryId),
      updater: new User(creatorUserId)
    });

    return await plate.save();
  }
}
