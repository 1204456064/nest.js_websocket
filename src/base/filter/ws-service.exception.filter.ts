import {
  ArgumentsHost,
  Catch,
  HttpException,
  WsExceptionFilter,
} from '@nestjs/common';
import { BizException } from '../../common/biz-exception';

/**
 * 全局WebSocket服务的异常处理，
 */
@Catch()
export class WsServiceExceptionFilter implements WsExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 进入该拦截器，说明http调用中存在异常，需要解析异常，并返回统一处理
    let responseWrapper: { returnCode:string; errorMessage: string };
    
    if (exception instanceof BizException) {
      // 业务层Exception
      responseWrapper = {
        returnCode: exception.errorCode.codeString,
        errorMessage: exception.errorMessage,
      };
    } else {
      // 其他错误
      responseWrapper = {
        returnCode: '999',
        errorMessage: 'server unknown error: ' + exception.message,
      };
    }

    // 对异常进行封装以后，需要让框架继续进行调用处理，才能正确的响应给客户端
    // 此时，需要提取到callback这个函数
    // 参考：https://stackoverflow.com/questions/61795299/nestjs-return-ack-in-exception-filter
    const callback = host.getArgByIndex(2);
    console.log(callback);
    
    if (callback && typeof callback === 'function') {
      callback(responseWrapper);
    }
  }
}
