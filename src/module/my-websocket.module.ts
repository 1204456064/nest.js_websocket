import {MyWebSocketGateway} from "../websocket/my-websocket.gateway";
import {Module} from "@nestjs/common";

@Module({
    providers: [MyWebSocketGateway]
})
export class MyWebSocketModule {

}