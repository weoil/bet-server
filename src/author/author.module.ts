import { CustomerModule } from './../customer/customer.module';
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

@Module({
  imports: [CustomerModule],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
