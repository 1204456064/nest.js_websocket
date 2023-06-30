import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { BizException } from '../common/biz-exception';
  import { ERR_REQ_FIELD_ERROR } from '../common/return-code';
  import { UseFilters, UseInterceptors, Get, Post } from '@nestjs/common';
  import { WsServiceResponseInterceptor } from '../base/interceptor/ws-service.response.interceptor';
  import { WsServiceExceptionFilter } from '../base/filter/ws-service.exception.filter';
  import * as WebSocket from 'ws';
import { Server } from 'socket.io';
  // 安装WebSocket成功响应拦截器
  @UseInterceptors(new WsServiceResponseInterceptor())

  // 安装WebSocket异常过滤器
  @UseFilters(new WsServiceExceptionFilter())
  
  @WebSocketGateway(4000, {
    transports: ['websocket'],
    cors: { origin: '*' }
  })
  
  export class MyWebSocketGateway {

    @WebSocketServer()
    serve: Server

    private clientFunction: any

    @SubscribeMessage('hello')
    hello(@MessageBody() requsetData: { name: string }, @ConnectedSocket() client: WebSocket) {
  
      // if (!requsetData || !requsetData.name) {
      //   throw BizException.create(ERR_REQ_FIELD_ERROR, '该消息没有名称');
      // }
      this.clientFunction = client
      client.emit('hello',JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }))

      return {
        "event": "hello",
        "data": requsetData,
        "msg": '123.com',
         client: client
      };
    }

    @SubscribeMessage('hello2')
    hello2(@MessageBody() requsetData: { name: string }, @ConnectedSocket() client: WebSocket) {
  
  
      console.log(2);
      client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }))
      
      return {
        "event": "hello",
        "data": requsetData,
        "msg": '123.com'
      };
    }

    customEvent(info:any) {
      console.log(info);
      // console.log(ConnectedSocket());
      // console.log(this.serve);
      
      // return info
      // this.clientFunction.emit('hello',JSON.stringify({ event: 'tmp', data: '我是自定义事件' }))
    }
  }
  