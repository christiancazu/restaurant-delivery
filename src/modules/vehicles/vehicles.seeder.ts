import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class VehiclesSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('vehicles')
      .values([
        {
          licencePlate: 'PE-A001',
          capability: 24
        },
        {
          licencePlate: 'PE-A002',
          capability: 24
        },
        {
          licencePlate: 'PE-A003',
          capability: 24
        },
        {
          licencePlate: 'PE-A004',
          capability: 24
        },
        {
          licencePlate: 'PE-A005',
          capability: 24
        },
        {
          licencePlate: 'PE-A006',
          capability: 24
        },
        {
          licencePlate: 'PE-A007',
          capability: 24
        },
        {
          licencePlate: 'PE-A008',
          capability: 24
        },
        {
          licencePlate: 'PE-A009',
          capability: 24
        },
        {
          licencePlate: 'PE-A010',
          capability: 24
        }
      ])
      .execute();
  }
}
