import { BetError } from '../utils/error';
import {
  Injectable,
  NestInterceptor,
  HttpException,
  Request,
} from '@nestjs/common';
import { createResult } from '../utils/result';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(
    context: import('@nestjs/common').ExecutionContext,
    next: import('@nestjs/common').CallHandler<any>,
  ): import('rxjs').Observable<any> | Promise<import('rxjs').Observable<any>> {
    return next.handle().pipe(
      catchError((err: any) => {
        if (err instanceof BetError) {
          return of(createResult(null, err.code, err.message));
        }
        throw err;
      }),
      map((result: any) => {
        return createResult(result);
      }),
    );
  }
}
