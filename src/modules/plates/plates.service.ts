import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plate } from './plate.entity';
import { Repository } from 'typeorm';
import { CreatePlateInputDto } from './dto/create-plate.input.dto';
import { User } from 'src/modules/users/user.entity';
import { Type } from '../types/type.entity';
import { Category } from '../categories/category.entity';
import { UpdatePlateInputDto } from './dto/update-plate.input.dto';

@Injectable()
export class PlatesService {
  constructor(
    @InjectRepository(Plate)
    private readonly _plateRepository : Repository<Plate>
  ) {}

  async findAll(): Promise<Plate[]> {
    return await this._plateRepository.find({ relations: ['updater', 'category', 'type'] });
  }

  async findByName(plateName: string): Promise<Plate> {
    console.warn('search', plateName);
    return await this._plateRepository.findOne({ where: { name: plateName } });
  }

  async create(dto: CreatePlateInputDto, creatorUserId: number): Promise<Plate> {
    let plate = await this._plateRepository.findOne({ where: { name: dto.name } });

    if (plate) {
      throw new UnprocessableEntityException('plate.errors.exists');
    }

    plate = this._plateRepository.create({
      ...dto,
      type: new Type(dto.typeId),
      category: new Category(dto.categoryId),
      updater: new User(creatorUserId)
    });

    return await plate.save();
  }

  async update(dto: UpdatePlateInputDto, updaterUserId: number): Promise<Plate> {
    const plate = await this._plateRepository.findOne({ where: { name: dto.name } });

    if (plate && plate.id !== dto.id) {
      throw new UnprocessableEntityException('plate.errors.exists');
    }

    return this._plateRepository.save({
      ...dto,
      type: new Type(dto.typeId),
      category: new Category(dto.categoryId),
      updater: new User(updaterUserId)
    });
  }
}
