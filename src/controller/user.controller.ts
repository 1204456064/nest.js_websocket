import { ConnectedSocket } from '@nestjs/websockets';
import { UserService } from '../service/user.service';
import { Body, Controller, Post, Get } from '@nestjs/common';
import * as WebSocket  from 'ws';
import { MyWebSocketGateway } from 'src/websocket/my-websocket.gateway';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService){}
    @Post('get-username')
    create(@Body() Body:{ userName:string; password: string}): Promise<boolean>{   
        // console.log(client);
        // console.log(this.ws.customEvent('123'));
        
        // this.ws.serve.emit('hello',JSON.stringify({ event: 'tmp', data: '我是猪' }))
        return this.UserService.getUserName(Body)
    }

    @Post('add-username')
    addUser(@Body() Body:any, @ConnectedSocket() client: WebSocket){        
        // client.send('hello',()=>{
        //     return {
        //         data:'123'
        //     }
        // })
        console.log(client);

        return this.UserService.addUser(Body,client)
    }
}
