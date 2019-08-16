// import { ResultInterceptor } from './app/result.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/module';

import '../database';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new ResultInterceptor());
  await app.listen(3000);
}
bootstrap();
