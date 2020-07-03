import { Module, ValidationPipe } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { APP_PIPE } from '@nestjs/core';
import { join } from 'path';
import { TypeModule } from './modules/types/type.module';
import { CategoryModule } from './modules/categories/category.module';
import { StatusModule } from './modules/status/status.module';
import { PaymentModule } from './modules/payments/payment.module';
import { RatingModule } from './modules/ratings/rating.module';
import { VehicleModule } from './modules/vehicles/vehicle.module';
import { PlateModule } from './modules/plates/plate.module';
import { CardModule } from './modules/cards/card.module';
import { OrderModule } from './modules/orders/order.module';
import { OrderCardsModule } from './modules/order-cards/order-cards.module';

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
    TypeModule,
    CategoryModule,
    StatusModule,
    PaymentModule,
    RatingModule,
    VehicleModule,
    PlateModule,
    CardModule,
    OrderModule,
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
