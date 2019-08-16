import { Controller, Post, Body } from '@nestjs/common';
import JWT from './jwt';
import { authSafe } from './author.interceptor';
import { get } from 'request-promise';
import { wechat } from '../../config.json';
import { CustomerService } from '../customer/customer.service';
import { AuthorService } from './author.service';
@Controller('author')
export class AuthorController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly authorService: AuthorService,
  ) {}
  @authSafe()
  @Post('login')
  async wechatLogin(@Body('code') code: string) {
    const res: string = await get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${
        wechat.appId
      }&secret=${wechat.secret}&js_code=${code}&grant_type=authorization_code`,
    );
    const { session_key, openid } = JSON.parse(res);
    let payload: Bet.RequestInUser;
    let customer = await this.customerService.getUserOfAppId(openid);
    if (!customer) {
      customer = await this.customerService.createUser('', '', openid);
    }
    payload = {
      id: customer._id,
      sesstionKey: session_key,
    };
    const { name, phone, avatar, address, isAuthor, intro } = customer;
    const token = JWT.sign(payload);
    // return token;
    return {
      id: payload.id,
      token,
      info: {
        name,
        intro,
        phone,
        avatar,
        address,
        isAuthor,
      },
    };
  }
  @Post()
  async wechatAuthor(
    @Body('iv') iv: string,
    @Body('encryptedData') encryptedData: string,
    @Body('user') user: Bet.RequestInUser,
  ) {
    const wechatInfo: any = await this.authorService.customerAuthor(
      user.id,
      user.sesstionKey,
      encryptedData,
      iv,
    );
    const form: {
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
    } = {
      avatar: wechatInfo.avatarUrl,
      name: wechatInfo.nickName,
      gender: wechatInfo.gender,
      province: wechatInfo.province,
      country: wechatInfo.country,
      city: wechatInfo.city,
    };
    const uerInfo = await this.customerService.updateUser(user.id, form, true);
    return uerInfo;
  }
}
