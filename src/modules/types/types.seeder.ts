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
          avatar: 'entradas.jpg',
          description: 'plato de entrada...'
        },
        {
          name: TYPES.FONDO,
          avatar: 'fondos.jpg',
          description: 'plato de fondo...'
        },
        {
          name: TYPES.POSTRE,
          avatar: 'postres.png',
          description: 'postre...'
        },
        {
          name: TYPES.BEBIDA,
          avatar: 'bebidas.webp',
          description: 'bebida...'
        },
        {
          name: TYPES.EXTRAS,
          avatar: 'extras.jpg',
          description: 'plato extra...'
        }
      ])
      .execute();
  }
}
