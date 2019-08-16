import { BetModule } from './../bet/bet.module';
import { AuthorModule } from './../author/author.module';
import { CustomerModule } from './../customer/customer.module';
import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { AuthInterceptor } from '../author/author.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResultInterceptor } from './result.interceptor';

@Module({
  imports: [CustomerModule, AuthorModule, BetModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResultInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
