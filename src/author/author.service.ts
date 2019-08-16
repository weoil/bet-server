import { CustomerService } from './../customer/customer.service';
import { Injectable } from '@nestjs/common';
import { createDecipheriv } from 'crypto';
import { wechat } from '../../config.json';
@Injectable()
export class AuthorService {
  constructor(private readonly customerService: CustomerService) {}
  encryptedData(sessionKey: string, encryptedData: string, iv: string) {
    const $sessionKey = new Buffer(sessionKey, 'base64');
    const $encryptedData: any = new Buffer(encryptedData, 'base64');
    const $iv = new Buffer(iv, 'base64');
    let decoded: any;
    try {
      // 解密
      const decipher = createDecipheriv('aes-128-cbc', $sessionKey, $iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update($encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }

    if (decoded.watermark.appid !== wechat.appId) {
      throw new Error('Illegal Buffer');
    }
    return decoded;
  }
  async customerAuthor(
    id: string,
    sessionKey: string,
    encryptedData: string,
    iv: string,
  ) {
    const data = this.encryptedData(sessionKey, encryptedData, iv);
    return data;
    // this.customerService.updateUser
  }
}
