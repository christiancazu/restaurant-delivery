import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository, MoreThan } from 'typeorm';
import { CreateCardInputDto } from './dto/create-card.dto';
import { Plate } from '../plates/plate.entity';
import { PlatesService } from 'src/modules/plates/plates.service';
import { User } from 'src/modules/users/user.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly _cardsRepository : Repository<Card>,
    private readonly _platesService: PlatesService
  ) {}

  async findAll(): Promise<Card[]> {
    const todayISOString = new Date().toISOString().split('T')[0];

    console.warn('todayISOString', todayISOString);

    return await this._cardsRepository.find({
      where: { createdAt: MoreThan(todayISOString) },
      relations: ['plate', 'updater']
    });
  }

  async findAllInCurrentDay(): Promise<Card[]> {
    const todayISOString = new Date().toISOString().split('T')[0];

    console.warn('todayISOString', todayISOString);

    return await this._cardsRepository.find({
      where: { createdAt: MoreThan(todayISOString) },
      relations: ['plate', 'updater']
    });
  }

  async create(dto: CreateCardInputDto, creatorUserId: number): Promise<Card> {
    const inCurrentDayCards = await this.findAllInCurrentDay();

    const cardCreatedToday = inCurrentDayCards.find(o => o.plate.id === dto.plateId);

    if (cardCreatedToday) {
      throw new UnprocessableEntityException('cards.errors.exists');
      // cardCreated = await this._cardsRepository.save({
      //   id: existsCard.id,
      //   ...dto,
      //   updater: new User(creatorUserId),
      //   stock: dto.createdStock
      // });
    }
    const card = this._cardsRepository.create({
      ...dto,
      updater: new User(creatorUserId)
    });

    return await card.save();
  }
}
