import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`running on: http://localhost:${port}`);
  }
}
bootstrap();
