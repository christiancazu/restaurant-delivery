import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { CardsModule } from './modules/cards/cards.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrderCardsModule } from './modules/order-cards/order-cards.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PlatesModule } from './modules/plates/plates.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { RolesModule } from './modules/roles/roles.module';
// import { MulterModule } from '@nestjs/platform-express';
// import { AppController } from './app.controller';
import { SharedModule } from './modules/shared/shared.module';
import { StatusModule } from './modules/status/status.module';
import { TypesModule } from './modules/types/types.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';



const IS_PRODUCTION_ENV: boolean = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '../../client', 'dist/pwa') }, {}),
    ConfigModule.forRoot({ isGlobal: true }),
    // MulterModule.register(),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      path: 'api/graphql',
      debug: !IS_PRODUCTION_ENV,
      playground: !IS_PRODUCTION_ENV,
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'common/gql/graphql.schema.generated.ts')
        // outputAs: 'class'
      },
      uploads: {
        maxFileSize: 5000000,
        maxFieldSize: 5000000
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
    OrderCardsModule,
    UploadModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
  controllers: [/*AppController*/]
})
export class AppModule {}
