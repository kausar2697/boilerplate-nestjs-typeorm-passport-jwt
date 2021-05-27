import { Module } from '@nestjs/common';
import { WsNotificationGateway } from './ws-notification.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [WsNotificationGateway],
})
export class WsNotificationModule {}
