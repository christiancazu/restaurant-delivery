import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository, MoreThan } from 'typeorm';
import { CreateCardInputDto } from './dto/create-card.dto';
import { Plate } from '../plates/plate.entity';
import { PlatesService } from 'src/modules/plates/plates.service';
import { User } from 'src/modules/users/user.entity';
import { DateTime } from 'luxon';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly _cardsRepository : Repository<Card>,
    private readonly _platesService: PlatesService
  ) {}

  async findAllinQueryDate(queryDate: Date): Promise<Card[]> {
    // TODO: define queryDate input
    return await this._cardsRepository.find({
      where: { /* createdAt: MoreThan() */ },
      relations: ['plate', 'updater']
    });
  }

  async findAllInCurrentDay(): Promise<Card[]> {
    const todayLocalTimeISOString = DateTime.local().toISODate();

    return await this._cardsRepository.find({
      where: { createdAt: MoreThan(todayLocalTimeISOString) },
      relations: ['plate', 'updater']
    });
  }

  async createOrUpdate(dtoCards: CreateCardInputDto[], creatorUserId: number): Promise<boolean> {
    const inCurrentDayCards = await this.findAllInCurrentDay();

    const updatedsCards: Card[] = [];

    dtoCards.forEach(dtoCard => {
      const indexExistsInCurrentDayCards = inCurrentDayCards.findIndex(c => c.plate.id === dtoCard.plateId);

      if (indexExistsInCurrentDayCards !== -1) {
        const updatedCard = inCurrentDayCards[indexExistsInCurrentDayCards];
        updatedCard.initialStock = dtoCard.initialStock;
        updatedCard.stock = dtoCard.stock;
        updatedCard.price = dtoCard.price;

        updatedsCards.push(updatedCard);
      } else {
        const newCard = new Card();
        newCard.initialStock = dtoCard.initialStock,
        newCard.price = dtoCard.price,
        newCard.plate = new Plate(dtoCard.plateId),
        newCard.updater = new User(creatorUserId);

        updatedsCards.push(newCard);
      }
    });

    updatedsCards.forEach(async updatedCard => await this._cardsRepository.save(updatedCard));

    return true;
  }
}
