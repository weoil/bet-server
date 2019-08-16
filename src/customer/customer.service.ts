import { Injectable, Body } from '@nestjs/common';
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
  async getUserOfAppId(id: string) {
    const customer = await CustomerModel.findOne(
      {
        openId: id,
      },
      {
        pass: 0,
      },
    );
    return customer;
  }
  async createUser(name: string, pass: string, openId: string) {
    const r = await CustomerModel.create({
      openId,
    });
    return r;
  }
  async updateUser(
    id: string,
    form: {
      name: string;
      phone?: string;
      email?: string;
      avatar: string;
      address?: string;
      intro?: string;
      gender: number;
      city: string;
      country: string;
      province: string;
      isAuthor?: boolean;
    },
    isAuthor: boolean = false,
  ) {
    if (isAuthor) {
      form.isAuthor = isAuthor;
    }
    console.log(form);
    const r = await CustomerModel.updateOne(
      {
        _id: id,
      },
      form,
    );
    const userInfo = await CustomerModel.findOne(
      {
        _id: id,
      },
      {
        pass: 0,
        unionId: 0,
        openId: 0,
      },
    );
    return userInfo;
  }
}
