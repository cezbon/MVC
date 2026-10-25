import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // V – widoki EJS leżą w katalogu views/, pliki statyczne (CSS) w public/
  app.setBaseViewsDir(join(import.meta.dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useStaticAssets(join(import.meta.dirname, '..', 'public'));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplikacja działa: http://localhost:${process.env.PORT ?? 3000}`);
}
await bootstrap();
