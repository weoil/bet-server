import { BetModule } from './../bet/bet.module';
import { AuthorModule } from './../author/author.module';
import { CustomerModule } from './../customer/customer.module';
import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';

@Module({
  imports: [CustomerModule, AuthorModule, BetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
