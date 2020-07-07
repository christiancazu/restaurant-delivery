import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CATEGORIES } from './enums/categories.enum';

export default class CategoriesSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('categories')
      .values([
        {
          name: CATEGORIES.CALDOS,
          description: 'caldos...'
        },
        {
          name: CATEGORIES.CHICHARRONES,
          description: 'chicharrones...'
        },
        {
          name: CATEGORIES.MIXTOS,
          description: 'mixtos...'
        },
        {
          name: CATEGORIES.POLLOS,
          description: 'pollos...'
        },
        {
          name: CATEGORIES.ENSALADAS,
          description: 'ensaladas...'
        },
        {
          name: CATEGORIES.ARROCES,
          description: 'arroces...'
        },
        {
          name: CATEGORIES.PESCADOS,
          description: 'pescados...'
        }
      ])
      .execute();
  }
}
