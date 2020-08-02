import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { STATUS } from './enums/status.enum';

export default class StatusSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('status')
      .values([
        {
          name: STATUS.RECEIVED,
          description: 'Recibido...'
        },
        {
          name: STATUS.PREPARING,
          description: 'En preparación...'
        },
        {
          name: STATUS.DISPATCHED,
          description: 'Despachado...'
        },
        {
          name: STATUS.DELIVERED,
          description: 'Entregado...'
        },
        {
          name: STATUS.CANCELED,
          description: 'Cancelado...'
        }
      ])
      .execute();
  }
}
