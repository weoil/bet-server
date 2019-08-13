import * as jsonwebtoken from 'jsonwebtoken';
import { jwt } from '../../config.json';
export default class JWT {
  static sign(payload: any) {
    jsonwebtoken.sign(payload, jwt.secret, {
      // expiresIn: 3,600,000*,
    });
  }
  static verify<T>(token: string): T {
    const obj: any = jsonwebtoken.verify(token, jwt.secret);
    return obj;
  }
}
