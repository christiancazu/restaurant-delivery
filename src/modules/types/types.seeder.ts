import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { TYPES } from './enums/types.enum';

export default class TypesSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('types')
      .values([
        {
          name: TYPES.ENTRADA,
          description: 'plato de entrada...'
        },
        {
          name: TYPES.FONDO,
          description: 'plato de fondo...'
        },
        {
          name: TYPES.POSTRE,
          description: 'postre...'
        },
        {
          name: TYPES.BEBIDA,
          description: 'bebida...'
        },
        {
          name: TYPES.EXTRAS,
          description: 'plato extra...'
        }
      ])
      .execute();
  }
}
