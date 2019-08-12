import { Injectable } from '@nestjs/common';
import CustomerModel from '../../database/scheam/customer';
@Injectable()
export class CustomerService {
  // constructor() {}
  async getUserOfId(id: string) {
    const customer = await CustomerModel.findOne(
      {
        _id: id,
      },
      {
        pass: 0,
      },
    );
    return customer;
  }
  async createUser(name: string, pass: string, openId: string) {
    const r = await CustomerModel.create({
      name,
      pass,
      openId,
    });
    return r;
  }
}
