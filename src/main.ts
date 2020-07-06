import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  // app.setGlobalPrefix('api');
  const configService = app.get<ConfigService>(ConfigService);

  const port = parseInt(configService.get('PORT'), 10) || 3000;

  app.useStaticAssets(join(__dirname, '../..', 'media'), { prefix: '/media/' });

  await app.listen(port);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`running gql api: http://localhost:${port}/api/graphql`);
  }
}

bootstrap();
