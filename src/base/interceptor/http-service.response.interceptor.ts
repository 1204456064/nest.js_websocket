// src/base/interceptor/http-service.response.interceptor.ts
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
// import { ServerResponseWrapper } from '../../common/server-response-wrapper';
import { SUCCESS } from '../../common/return-code';

/**
 * 全局Http服务响应拦截器
 * 该Interceptor在main中通过
 * app.useGlobalInterceptors 来全局引入，
 * 仅处理HTTP服务成功响应拦截，异常是不会进入该拦截器
 */
export class HttpServiceResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('请求成功');

    return next.handle().pipe(
      map((data) => {
        // 进入该拦截器，说明没有异常，使用成功返回
        const resp: { code: string, data: string; message: string } = {
          code: SUCCESS.codeString,
          data: data,
          message: "请求成功"
        };
        return resp;
      }),
    );
  }
}
