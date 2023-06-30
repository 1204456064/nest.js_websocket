import {MyWebSocketGateway} from "../websocket/my-websocket.gateway";
import {Module} from "@nestjs/common";

@Module({
    exports: [MyWebSocketGateway],
    providers: [MyWebSocketGateway]
})
export class MyWebSocketModule {

}