import { Controller, Post, Param, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('register')
  async register(@Body('user') code: string, @Body('pass') pass: string) {
    return await this.customerService.createUser(code, pass, '');
  }
}
