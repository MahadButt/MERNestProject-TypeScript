import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logger from "morgan";
import * as helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors()
  app.use(logger('dev'));
  app.use(helmet());
  await app.listen(4000);
}
bootstrap();
