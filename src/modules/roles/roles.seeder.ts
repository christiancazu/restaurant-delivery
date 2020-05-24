import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Roles } from '../../modules/roles/enums/roles.enum';

export default class RolesSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('roles')
      .values([
        {
          name: Roles.ADMIN,
          description: 'admin...'
        },
        {
          name: Roles.USER,
          description: 'user...'
        },
        {
          name: Roles.CHEF,
          description: 'chef...'
        },
        {
          name: Roles.DEALER,
          description: 'dealer...'
        },
      ])
      .execute();
  }
}
