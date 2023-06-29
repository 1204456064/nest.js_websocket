import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import { Request, Response } from "express";
/**
 * 全局Http服务的异常处理，
 */
@Catch()
export class HttpServiceExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
     
        // HTTP应用上下文
        const ctx = host.switchToHttp();

        // 响应上下文
        const response = ctx.getResponse<Response>();
        
        // 请求上下文
        const request = ctx.getRequest<Request>();

        // 异常码
        const status = exception.getStatus();
        
        // 响应
        const returnMessage = {
            code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        }

        response.status(status).json(returnMessage);
    }
}
