import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway()
export class WsNotificationGateway implements OnGatewayInit, OnGatewayConnection,OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server

  private logger: Logger = new Logger('WsNotificationGateway');
  
  afterInit(server: any) {
    // throw new Error('Method not implemented.');
    this.logger.log('Initialized')
  }

  handleDisconnect(client: any) {
    this.logger.log(`client disconenct: ${client.id}`)
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`client connected: ${client.id}`)
  }

  @SubscribeMessage('sendNotification')
  handleMessage(client: Socket, text: string): any {
      console.log("msg------------",text)
    // this.wss.emit('getNotification',text)
    client.broadcast.emit('getNotification',text)
    // return {event: `getNotification`,data:text}
  }
}
