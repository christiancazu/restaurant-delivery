import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app.setGlobalPrefix('api');
  const configService = app.get<ConfigService>(ConfigService);

  const port = parseInt(configService.get('PORT'), 10) || 3000;

  await app.listen(port);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`running gql api: http://localhost:${port}/graphql`);
  }
}

bootstrap();
