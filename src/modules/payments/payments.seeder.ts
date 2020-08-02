import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PAYMENTS } from './enums/payments.enum';

export default class PaymentsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('payments')
      .values([
        {
          name: PAYMENTS.CASH,
          description: 'Pago al contado'
        },
        {
          name: PAYMENTS.CREDIT_CARD,
          description: 'Pago con tarjeta de crédito'
        },
        {
          name: PAYMENTS.YAPE,
          description: 'Pago con YAPE'
        }
      ])
      .execute();
  }
}
