import {
  Injectable,
  NestInterceptor,
  HttpException,
  Request,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import JWT from './jwt';
import { createResult } from '../utils/result';
import { of } from 'rxjs';
// tslint:disable no-console

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: import('@nestjs/common').ExecutionContext,
    next: import('@nestjs/common').CallHandler<any>,
  ): import('rxjs').Observable<any> | Promise<import('rxjs').Observable<any>> {
    const isAuthSafe = this.reflector.get<boolean>(
      'authSafe',
      context.getHandler(),
    );
    if (!isAuthSafe) {
      const request: any = context.switchToHttp().getRequest();
      const token = request.headers['x-token'];
      try {
        const user = JWT.verify<Bet.RequestInUser>(token);
        request.body.user = user;
      } catch (err) {
        return of(createResult(null, 100, '登录信息校验失败'));
      }
    }
    return next.handle();
  }
}

export function authSafe(status: boolean = true) {
  return SetMetadata('authSafe', status);
}
