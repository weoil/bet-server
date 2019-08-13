import {
  Injectable,
  NestInterceptor,
  HttpException,
  Request,
} from '@nestjs/common';
import JWT from './jwt';
import { createResult } from 'src/utils/result';
import { of } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(
    context: import('@nestjs/common').ExecutionContext,
    next: import('@nestjs/common').CallHandler<any>,
  ): import('rxjs').Observable<any> | Promise<import('rxjs').Observable<any>> {
    const request: any = context.switchToHttp().getRequest();
    const token = request.headers.get('x-token');
    try {
      const user = JWT.verify<Bet.RequestInUser>(token);
      request.body.user = user;
    } catch (err) {
      return of(createResult(null, 100, '登录信息校验失败'));
    }
    return next.handle();
  }
}
