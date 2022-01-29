import { Module } from '@nestjs/common'
import { ServerSentEventsController } from './server-sent-events.controller'

@Module({
  imports: [],
  controllers: [
    ServerSentEventsController
  ],
  providers: [],
  exports: []
})
export class ServerSentEventsModule {}


