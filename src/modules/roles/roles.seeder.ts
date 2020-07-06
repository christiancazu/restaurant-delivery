import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ROLES } from '../../modules/roles/enums/roles.enum';

export default class RolesSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('roles')
      .values([
        {
          name: ROLES.SUPER_ADMIN,
          description: 'super admin...'
        },
        {
          name: ROLES.ADMIN,
          description: 'admin...'
        },
        {
          name: ROLES.CLIENT,
          description: 'user...'
        },
        {
          name: ROLES.CHEF,
          description: 'chef...'
        },
        {
          name: ROLES.DEALER,
          description: 'dealer...'
        }
      ])
      .execute();
  }
}
