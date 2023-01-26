import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // process.env.PORT is environment variable provided by heroku
  // for production deployment on heroku
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
