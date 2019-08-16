import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body('user') user: any): string {
    console.log(user);
    return this.appService.getHello();
  }
}
