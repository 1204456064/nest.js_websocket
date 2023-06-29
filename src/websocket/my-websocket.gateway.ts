import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
  } from '@nestjs/websockets';
  import { BizException } from '../common/biz-exception';
  import { ERR_REQ_FIELD_ERROR } from '../common/return-code';
  import { UseFilters, UseInterceptors } from '@nestjs/common';
  import { WsServiceResponseInterceptor } from '../base/interceptor/ws-service.response.interceptor';
  import { WsServiceExceptionFilter } from '../base/filter/ws-service.exception.filter';
  
  // 安装WebSocket成功响应拦截器
  @UseInterceptors(new WsServiceResponseInterceptor())

  // 安装WebSocket异常过滤器
  @UseFilters(new WsServiceExceptionFilter())
  
  @WebSocketGateway(4000, {
    transports: ['websocket'],
    cors: { origin: '*' }
  })
  
  export class MyWebSocketGateway {
    @SubscribeMessage('hello')
    hello(@MessageBody() requsetData: { name: string }) {
  
      if (requsetData || !requsetData.name) {
        throw BizException.create(ERR_REQ_FIELD_ERROR, '该消息没有名称');
      }

      return '已接收到消息';
    }
  }
  