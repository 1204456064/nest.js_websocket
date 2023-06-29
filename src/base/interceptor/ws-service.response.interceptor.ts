// src/base/interceptor/ws-service.response.interceptor.ts
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
// import { ServerResponseWrapper } from '../../common/server-response-wrapper';
import { SUCCESS } from '../../common/return-code';

/**
 * WebSocket服务响应拦截器，异常不会进入该拦截器
 */
export class WsServiceResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('webSocket响应');
    
    return next.handle().pipe(
      map((data) => {
        const resp: { returnCode: string, data: string} = {
          returnCode: SUCCESS.codeString,
          data: data,
        };
        return resp;
      }),
    );
  }
}
