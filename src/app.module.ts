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
import { TypeModule } from './modules/type/type.module';

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
        path: join(process.cwd(), 'common/gql/graphql.schema.generated.ts'),
        // outputAs: 'class'
      },
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    TypeModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
  ],
})
export class AppModule {}
