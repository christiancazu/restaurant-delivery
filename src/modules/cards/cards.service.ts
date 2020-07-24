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

  async findOneInQueryDate(queryDate: Date): Promise<Card[]> {
    // TODO: define queryDate input
    return await this._cardsRepository.find({
      where: { /* createdAt: MoreThan() */ },
      relations: ['plate', 'updater', 'plate.type', 'plate.category']
    });
  }

  async findAllInCurrentDay(): Promise<Card[]> {
    const todayLocalTimeISOString = DateTime.local().toISODate();

    return await this._cardsRepository.find({
      where: {
        createdAt: MoreThan(todayLocalTimeISOString),
        enabled: true
      },
      relations: ['plate', 'updater', 'plate.type', 'plate.category']
    });
  }

  async updateCard(dtoCard: CreateCardInputDto, creatorUserId: number): Promise<Card[]> {
    const inCurrentDayCards = await this.findAllInCurrentDay();

    const inCurrentDayCard = inCurrentDayCards.find(o => o.plate.id === dtoCard.plateId);

    inCurrentDayCard.initialStock = dtoCard.initialStock;
    inCurrentDayCard.stock = dtoCard.stock;
    inCurrentDayCard.price = dtoCard.price;
    inCurrentDayCard.updater = new User(creatorUserId);

    await this._cardsRepository.save(inCurrentDayCard);

    return await this.findAllInCurrentDay();
  }

  async createOrUpdateCards(dtoCards: CreateCardInputDto[], creatorUserId: number): Promise<Card[]> {
    const inCurrentDayCards = await this.findAllInCurrentDay();

    const updatedsCards: Card[] = [];

    // in dtoCards update or create
    dtoCards.forEach(dtoCard => {
      const indexExistsInCurrentDayCards = inCurrentDayCards.findIndex(c => c.plate.id === dtoCard.plateId);

      if (indexExistsInCurrentDayCards !== -1) {
        const updatedCard = inCurrentDayCards[indexExistsInCurrentDayCards];
        updatedCard.initialStock = dtoCard.initialStock;
        updatedCard.stock = dtoCard.stock;
        updatedCard.price = dtoCard.price;
        updatedCard.enabled = dtoCard.enabled;

        updatedsCards.push(updatedCard);
      } else {
        const newCard = new Card();
        newCard.initialStock = dtoCard.initialStock;
        newCard.price = dtoCard.price;
        newCard.plate = new Plate(dtoCard.plateId);
        newCard.updater = new User(creatorUserId);

        updatedsCards.push(newCard);
      }
    });

    // inCurrentDayCards update enabled value if exists on dtoCards
    inCurrentDayCards.forEach(inCurrentDayCard => {
      const cardExistsInDtoCards = dtoCards.find(o => o.plateId === inCurrentDayCard.plate.id);
      if (!cardExistsInDtoCards) {
        inCurrentDayCard.enabled = false;

      } else {
        inCurrentDayCard.initialStock = cardExistsInDtoCards.initialStock;
        inCurrentDayCard.stock = cardExistsInDtoCards.stock;
        inCurrentDayCard.price = cardExistsInDtoCards.price;
        inCurrentDayCard.enabled = true;
      }
      inCurrentDayCard.updater = new User(creatorUserId);
      updatedsCards.push(inCurrentDayCard);
    });

    await Promise.all(updatedsCards.map(updatedCard => this._cardsRepository.save(updatedCard)));

    return await this.findAllInCurrentDay();
  }
}
