import { Module, ValidationPipe } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE } from '@nestjs/core';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { TypesModule } from './modules/types/types.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { StatusModule } from './modules/status/status.module';
import { PaymentsModule } from './modules/payments/payment.module';
import { RatingsModule } from './modules/ratings/rating.module';
import { VehiclesModule } from './modules/vehicles/vehicle.module';
import { PlatesModule } from './modules/plates/plate.module';
import { CardsModule } from './modules/cards/card.module';
import { OrdersModule } from './modules/orders/order.module';
import { OrderCardsModule } from './modules/order-cards/order-cards.module';

import { join } from 'path';

const IS_PRODUCTION_ENV: boolean = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '../../client', 'dist/pwa') }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      debug: !IS_PRODUCTION_ENV,
      playground: !IS_PRODUCTION_ENV,
      context: ({ req }) => ({ req }),
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'common/gql/graphql.schema.generated.ts')
        // outputAs: 'class'
      }
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    TypesModule,
    CategoriesModule,
    StatusModule,
    PaymentsModule,
    RatingsModule,
    VehiclesModule,
    PlatesModule,
    CardsModule,
    OrdersModule,
    OrderCardsModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
