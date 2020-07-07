import { Repository, EntityRepository } from 'typeorm';
import { Plate } from './plate.entity';

@EntityRepository(Plate)
export class PlateRepository extends Repository<Plate> {}
