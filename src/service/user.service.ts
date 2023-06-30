import { Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm'
import { sys_user } from '../entity/user.entity';
import {MyWebSocketGateway} from "../websocket/my-websocket.gateway";

import { Repository } from 'typeorm';
import * as WebSocket from 'ws';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(sys_user)
        private readonly productsRepository: Repository<sys_user>,
    ){}
    private ws: MyWebSocketGateway

   async getUserName(userInfo:{ userName: string; password: string }):Promise<boolean>{
        const res = await this.productsRepository.query('select * from sys_user')

        if(res.length === 0){
            return false
        }

        let valid = false
        res.forEach((item:{ id:number; userName: string; password: string })=>{
            if(item.userName ===userInfo.userName){
                valid =  true
            }
        })

        this.ws.customEvent(123)

        return valid

    }

    async addUser(userInfo:{ userName: string; password: string},client:WebSocket){
        const res = await this.productsRepository.query('select * from sys_user')

        if(res.length === 0){
            return await this.productsRepository.insert(userInfo)
        }

        let valid = true

        res.forEach((item:{ id:number; userName: string; password: string })=>{
            if(item.userName ===userInfo.userName){
                valid =  false
            }
        })

       if(!valid){
           return false
       }
       console.log(client);
       
       client.emit('hello',JSON.stringify({ event: 'tmp', data: '我恁爹' }))
       
       return await this.productsRepository.insert(userInfo)
    }
}
