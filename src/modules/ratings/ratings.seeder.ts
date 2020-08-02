import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { RATINGS } from './enums/ratings.enum';

export default class RatingsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('ratings')
      .values([
        {
          name: RATINGS.VERY_BAD,
          description: 'Muy malo'
        },
        {
          name: RATINGS.BAD,
          description: 'Malo'
        },
        {
          name: RATINGS.REGULAR,
          description: 'Regular'
        },
        {
          name: RATINGS.GOOD,
          description: 'Bueno'
        },
        {
          name: RATINGS.VERY_GOOD,
          description: 'Muy bueno'
        }
      ])
      .execute();
  }
}
